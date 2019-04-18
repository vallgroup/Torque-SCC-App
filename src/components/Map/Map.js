import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from './helpers/Geocode';
import NearbySearch from './helpers/NearbySearch';

export class TorqueMap extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = props;

    this.state = {
      mapCenter: {}, // lat a& lng object
      markers: [],
      markerIcon: settings.poi_icon,
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
    const { poiSearch } = this.props;
    const { mapCenter } = this.state;
    const { poiSearch: prevPoiSearch } = prevProps;
    const { mapCenter: prevMapCenter } = prevState;

    const gotFirstMapCenter =
      !Object.keys(prevMapCenter || {}).length && Object.keys(mapCenter || {}).length;

    if (poiSearch !== prevPoiSearch || gotFirstMapCenter) {
      if (this.map.current && poiSearch) {
        this.nearbySearch();
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
    const {
      settings: { poi_icon: markersIcon },
      google,
    } = this.props;
    const { markers } = this.state;

    const width = 60;
    const height = 100;

    const filteredMarkers = markers.filter(marker => !!marker);

    return filteredMarkers.map((marker, index) => (
      <Marker
        key={marker.id}
        onClick={this.onMarkerClick}
        name={marker.name}
        position={marker.geometry.location}
        icon={{
          url: markersIcon,
          anchor: new google.maps.Point(width / 2, height),
          size: new google.maps.Size(width, height),
          scaledSize: new google.maps.Size(width, height),
        }}
        infowindow={this.getInfoWindowForMarker(marker)}
      />
    ));
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

  setMapCenterFromProps() {
    const {
      settings: { center },
    } = this.props;

    if (center) this.geocode();
  }

  async geocode() {
    const {
      settings: { center: address },
    } = this.props;

    const geoClient = new Geocode();
    const coordinates = await geoClient.geocode({ address });
    this.updateMapCenter(coordinates);
  }

  nearbySearch() {
    const { poiSearch } = this.props;

    if (!(this.map.current && this.map.current.map)) {
      return;
    }

    if (!poiSearch) {
      return;
    }

    this.setState({
      markers: [],
      markerIcon: null,
    });

    const keywords = poiSearch.split(',');
    if (!this.searchClient) this.searchClient = new NearbySearch(this.map.current.map);

    keywords.forEach((kWord, idx) => {
      this.doSearch(kWord);
    });
  }

  async doSearch(keyword) {
    const {
      settings: { poi_icon },
    } = this.props;
    const { mapCenter, markers } = this.state;

    const results = await this.searchClient.search({
      keyword,
      location: mapCenter,
      radius: 1000,
    });

    if (results) {
      if (results.length === 0) {
        console.warn(`${keyword} did not return any results.`);
        return;
      }

      const markers = [...markers, ...results];

      // add markers and call our callback
      this.setState({
        markers,
        markerIcon: poi_icon,
      });
    }
  }
}

TorqueMap.propTypes = {
  poiSearch: PropTypes.string,
  settings: PropTypes.shape({
    center: PropTypes.string.isRequired,
    zoom: PropTypes.string.isRequired,
    center_marker_icon: PropTypes.string.isRequired,
    poi_icon: PropTypes.string.isRequired,
    style: PropTypes.string,
  }),
};

export default GoogleApiWrapper(props => ({
  apiKey: props.settings.api_key,
}))(TorqueMap);
