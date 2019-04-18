import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from './helpers/Geocode';

const mapState = (state, props) => ({
  pois: pageSelectors.getPois(state, props),
  settings: pageSelectors.getMapSettings(state, props),
});

export class TorqueMap extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = props;

    this.state = {
      mapCenter: {}, // lat a& lng object
      markers: [],
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false,
    };

    this.map = createRef();
    this.searchClient = null;
  }

  componentWillMount() {
    this.setMapCenterFromProps();
  }

  componentDidUpdate(prevProps, prevState) {
    const { pois } = this.props;
    const { mapCenter } = this.state;
    const { pois: prevPois } = prevProps;
    const { mapCenter: prevMapCenter } = prevState;

    const gotFirstMapCenter =
      !Object.keys(prevMapCenter || {}).length && Object.keys(mapCenter || {}).length;

    if (pois !== prevPois || gotFirstMapCenter) {
      if (this.map.current) {
        this.findPois();
      }
    }
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClick = () => {
    const { showingInfoWindow } = this.state;

    if (showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  // pass a lat and lng object
  updateMapCenter = center => {
    this.setState({
      mapCenter: center,
    });
  };

  renderCenterMarker = () => {
    const {
      settings: { center_marker_icon: centerMarker },
      google,
    } = this.props;
    const { mapCenter } = this.state;

    const width = 101;
    const height = 153;

    return (
      <Marker
        onClick={this.onMarkerClick}
        name={'SCC'}
        position={mapCenter}
        zIndex={google.maps.Marker.MAX_ZINDEX + 1}
        icon={
          centerMarker && {
            url: centerMarker,
            anchor: new google.maps.Point(width / 2, height),
            scaledSize: new google.maps.Size(width, height),
          }
        }
      />
    );
  };

  renderMarkers() {
    const { google } = this.props;
    const { markers } = this.state;

    const width = 60;
    const height = 100;

    console.log(markers);

    /*
    const filteredMarkers = markers.filter(marker => !!marker);

    return filteredMarkers.map((marker, index) => (
      <Marker
        key={marker.id}
        onClick={this.onMarkerClick}
        name={marker.name}
        position={marker.geometry.location}
        icon={{
          url: marker.url,
          anchor: new google.maps.Point(width / 2, height),
          size: new google.maps.Size(width, height),
          scaledSize: new google.maps.Size(width, height),
        }}
        infowindow={this.getInfoWindowForMarker(marker)}
      />
    ));
    */
  }

  getInfoWindowForMarker = marker => {
    const {
      name,
      distance,
      place_id,
      opening_hours,
      price_level,
      rating,
      user_ratings_total,
      vicinity,
      photos,
    } = marker;

    const info = {
      name,
      distance,
      placeID: place_id,
      openingHours: opening_hours,
      dollarSigns: price_level,
      rating,
      reviews: user_ratings_total,
      vicinity,
      photos,
    };

    return info;
  };

  renderDynamicInfowindow() {
    const {
      settings: { center_marker_icon: centerMarker },
    } = this.props;
    const { selectedPlace } = this.state;

    if (selectedPlace?.infowindow) {
      const { infowindow } = selectedPlace;

      return (
        <div className="torque-map-infowindow">
          <div>
            <h3>{infowindow.name}</h3>
            <p>{infowindow.vicinity}</p>
            {infowindow.openingHours && (
              <p>{infowindow.openingHours.open_now ? <b>Open</b> : <b>closed</b>}</p>
            )}
          </div>
        </div>
      );
    }

    if (centerMarker?.icon?.infoWindow) {
      return (
        <div
          className="torque-map-dynamic-infowindow"
          dangerouslySetInnerHTML={{
            __html: this.props.centerMarker.icon.infowindow,
          }}
        />
      );
    }
  }

  render() {
    const {
      google,
      settings: { center, zoom, style, center_marker_icon: centerMarker },
    } = this.props;
    const { mapCenter, markers, activeMarker, showingInfoWindow, selectedPlace } = this.state;

    return (
      <div onClick={this.onMapClick} className="torque-map-container">
        <Map
          google={google}
          zoom={+zoom || 16}
          center={mapCenter}
          ref={this.map}
          styles={(style && JSON.parse(style)) || undefined}
        >
          {center && centerMarker && this.renderCenterMarker()}
          {markers && markers.length > 0 && this.renderMarkers()}

          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <div>
              <h3>{selectedPlace.name}</h3>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }

  setMapCenterFromProps = async () => {
    const {
      settings: { center },
    } = this.props;

    if (center) {
      const coords = await this.geocode(center);
      this.updateMapCenter(coords);
    }
  };

  findPois = async () => {
    const { pois } = this.props;

    const markers = await Promise.all(pois.map(this.findPoi));

    this.setState({ markers });
  };

  findPoi = async poi => {
    if (poi.address && !(poi.longitude || poi.latitude)) {
      // if user didnt pass long an lat, we have to find them ourselves
      //
      const coords = await this.geocode(poi.address);
      poi.longitude = coords.lng;
      poi.latitude = coords.lat;
    }

    return poi;
  };

  geocode = async address => {
    const geoClient = new Geocode();
    const coordinates = await geoClient.geocode({ address });
    return coordinates;
  };
}

TorqueMap.propTypes = {
  pois: PropTypes.array.isRequired,
  settings: PropTypes.shape({
    api_key: PropTypes.string.isRequired,
    center: PropTypes.string.isRequired,
    zoom: PropTypes.string.isRequired,
    center_marker_icon: PropTypes.string.isRequired,
    style: PropTypes.string,
  }),
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  GoogleApiWrapper(props => ({
    apiKey: props.settings.api_key,
  })),
)(TorqueMap);
