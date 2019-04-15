import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import TransitionEnterExit, { TRANSITION_TYPES } from '../TransitionEnterExit';

const mapState = state => ({
  isAnimating: pageSelectors.getIsAnimating(state),
});

const RouteEnterExit = ({ isAnimating, transition, children }) => (
  <TransitionEnterExit in={!isAnimating} classNames="route" transition={transition} timeout={1000}>
    {children}
  </TransitionEnterExit>
);

RouteEnterExit.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
  transition: PropTypes.oneOf(TRANSITION_TYPES),
  children: PropTypes.node.isRequired,
};

export default compose(
  connect(
    mapState,
    null,
  ),
  memo,
)(RouteEnterExit);
