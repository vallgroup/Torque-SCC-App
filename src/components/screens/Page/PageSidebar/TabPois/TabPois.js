import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { ContentRoot, PoiWrapper } from './TabPois.styles';

const mapState = (state, props) => ({
  pois: pageSelectors.getPois(state, props),
});

const TabPois = ({ pois }) =>
  pois?.length ? (
    <ContentRoot>
      {pois.map(poi => (
        <PoiWrapper key={poi.name}>
          <div className="poi_name">{poi.name}</div>
          <div className="poi_distance">
            {(poi?.distance_type === 'distance' && poi?.distance?.text) ||
              (poi?.distance_type === 'duration' && poi?.duration?.text)}
          </div>
        </PoiWrapper>
      ))}
    </ContentRoot>
  ) : null;

TabPois.propTypes = {
  pois: PropTypes.array,
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(TabPois);
