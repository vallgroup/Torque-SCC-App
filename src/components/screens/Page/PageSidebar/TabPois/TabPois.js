import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { ContentRoot, PoiWrapper } from './TabPois.styles';

const mapState = (state, props) => ({
  pois: pageSelectors.getPois(state, props),
  distanceType: pageSelectors.getDistanceType(state, props),
});

const TabPois = ({ pois, distanceType }) =>
  pois?.length ? (
    <ContentRoot>
      {pois.map(poi => (
        <PoiWrapper key={poi.name}>
          <div className="poi_name">{poi.name}</div>
          <div className="poi_distance">
            {(distanceType === 'distance' && poi?.distance?.text) ||
              (distanceType === 'duration' && poi?.duration?.text)}
          </div>
        </PoiWrapper>
      ))}
    </ContentRoot>
  ) : null;

TabPois.propTypes = {
  pois: PropTypes.array,
  distanceType: PropTypes.oneOf(['distance', 'duration']).isRequired,
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(TabPois);
