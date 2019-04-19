import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { updatePois as updatePoisAction } from 'store/actions';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from './helpers/Geocode';
import DistanceMatrix from './helpers/DistanceMatrix';
import { MapContainer, InfoWindowRoot } from './Map.styles';

const mapState = (state, props) => ({
  tabIndex: pageSelectors.getCurrentTabIndex(state, props),
  pois: pageSelectors.getPois(state, props),
  settings: pageSelectors.getMapSettings(state, props),
});

const mapActions = {
  updatePois: updatePoisAction,
};

export class TorqueMap extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = props;

    this.state = {
      mapCenter: {}, // lat a& lng object
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
    const { tabIndex } = this.props;
    const { mapCenter } = this.state;
    const { tabIndex: prevTabIndex } = prevProps;
    const { mapCenter: prevMapCenter } = prevState;

    const gotFirstMapCenter =
      !Object.keys(prevMapCenter || {}).length && Object.keys(mapCenter || {}).length;

    if (tabIndex !== prevTabIndex || gotFirstMapCenter) {
      this.setState({ showingInfoWindow: false });

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
    const { google, pois } = this.props;

    const width = 60;
    const height = 100;

    const filteredPois = pois.filter(poi => !!poi && poi.longitude && poi.latitude);

    return filteredPois.map((poi, index) => (
      <Marker
        key={poi.name}
        onClick={this.onMarkerClick}
        name={poi.name}
        position={{ lng: poi.longitude, lat: poi.latitude }}
        icon={{
          url: poi.icon,
          anchor: new google.maps.Point(width / 2, height),
          size: new google.maps.Size(width, height),
          scaledSize: new google.maps.Size(width, height),
        }}
        infowindow={this.getInfoWindowForMarker(poi)}
      />
    ));
  }

  getInfoWindowForMarker = poi => {
    const { name, distance, duration } = poi;

    const info = {
      name,
      distance: distance?.text || '',
      duration: duration?.text || '',
    };

    return info;
  };

  render() {
    const {
      google,
      settings: { center, zoom, style, center_marker_icon: centerMarker },
      pois,
    } = this.props;
    const { mapCenter, activeMarker, showingInfoWindow, selectedPlace } = this.state;

    return (
      <MapContainer>
        <Map
          google={google}
          zoom={+zoom || 16}
          center={mapCenter}
          ref={this.map}
          styles={(style && JSON.parse(style)) || undefined}
        >
          {center && centerMarker && this.renderCenterMarker()}
          {pois && pois.length > 0 && this.renderMarkers()}

          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <InfoWindowRoot>
              <h3>{selectedPlace.name}</h3>
              <div className="info_container">
                {selectedPlace?.infowindow?.distance && (
                  <div>{selectedPlace.infowindow.distance}</div>
                )}
                {selectedPlace?.infowindow?.duration && (
                  <div>{selectedPlace.infowindow.duration}</div>
                )}
              </div>
            </InfoWindowRoot>
          </InfoWindow>
        </Map>
      </MapContainer>
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
    const {
      pois,
      updatePois,
      match: {
        params: { pageSlug },
      },
    } = this.props;

    const newPois = await Promise.all(pois.map(this.findPoi));

    updatePois({ pageSlug, pois: newPois });
  };

  findPoi = async poi => {
    const {
      mapCenter: { lng: longitude, lat: latitude },
    } = this.state;

    if (!poi.address && !(poi.longitude && poi.latitude)) {
      console.warn(`Point of interest ${poi.name} has neither address nor coords`);
      return poi;
    }

    if (!(poi.longitude && poi.latitude)) {
      const coords = await this.geocode(poi.address);
      poi.longitude = coords.lng;
      poi.latitude = coords.lat;
    }

    if (!(poi.distance && poi.duration)) {
      const distanceObj = await this.getDistance({ longitude, latitude }, poi);
      poi = { ...poi, ...distanceObj };
    }

    return poi;
  };

  geocode = async address => {
    const geoClient = new Geocode();
    const coordinates = await geoClient.geocode({ address });
    return coordinates;
  };

  getDistance = async (origin, destination) => {
    const distanceMatrixService = new DistanceMatrix();
    const distance = await distanceMatrixService.getDistance({ origin, destination });
    return distance;
  };
}

TorqueMap.propTypes = {
  tabIndex: PropTypes.number.isRequired, // from connect
  pois: PropTypes.array.isRequired, // from connect
  // from connect
  settings: PropTypes.shape({
    api_key: PropTypes.string.isRequired,
    center: PropTypes.string.isRequired,
    zoom: PropTypes.string.isRequired,
    center_marker_icon: PropTypes.string.isRequired,
    style: PropTypes.string,
  }),
  updatePois: PropTypes.func.isRequired, // from connect
};

export default compose(
  withRouter,
  connect(
    mapState,
    mapActions,
  ),
  GoogleApiWrapper(props => ({
    apiKey: props.settings.api_key,
  })),
)(TorqueMap);
