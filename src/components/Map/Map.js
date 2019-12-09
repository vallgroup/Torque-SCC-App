import React, { memo, useRef, useState, useEffect } from 'react';
import { TransitionEnterExit } from 'theme';
import TorqueMap from "torque-map"

class MapSCC extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      map: null,
      loading: true,
    }
  }

  componentWillMount() {
    this.props.mapID
      && this.ajaxMapDetails(this.props.mapID)
  }

  render() {
    if ( !this.state.map ) {
      // add loading animation here..?
      return null;
    }

    return (
      <p>{'This is the map'}</p>
    );
  }

  async ajaxMapDetails(mapID) {
    try {
      const url = this.props.site + `/wp-json/torque-map/v1/map/${mapID}`;
      const mapPost = await axios.get(url);
      return mapPost.data
    } catch (err) {
      console.error(err);
    }
  }
};

export default MapSCC;
