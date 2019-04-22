import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import TransitionEnterExit from '../TransitionEnterExit';

/**
 * Wrap around any component to have it transition with the route animation
 */

const mapState = state => ({
  isAnimating: pageSelectors.getIsAnimating(state),
  locationState: pageSelectors.getLocation(state),
});

const RouteEnterExit = ({
  homeTransitionOnly,
  theme,
  location,
  locationState: { prevLocation, location: undelayedLocation },
  isAnimating,
  children,
  ...TransitionEnterExitProps
}) => {
  let show = !isAnimating;

  if (homeTransitionOnly) {
    const prevPathname = prevLocation?.pathname;
    const { pathname: undelayedPathname } = undelayedLocation;
    const { pathname } = location;

    const isHomeTransition = prevPathname === '/' || undelayedPathname === '/' || pathname === '/';

    // override and prevent default animation if it's not a transition to/from home
    if (isAnimating && !isHomeTransition) {
      show = true;
    }
  }

  return (
    <TransitionEnterExit
      in={show}
      classNames="route"
      timeout={theme.vars.SWITCH_DELAY}
      mountOnEnter
      {...TransitionEnterExitProps}
    >
      {children}
    </TransitionEnterExit>
  );
};

RouteEnterExit.propTypes = {
  homeTransitionOnly: PropTypes.bool, // only animate to/from the homepage
  children: PropTypes.node.isRequired,
  //
  location: PropTypes.object.isRequired, // from withRouter
  theme: PropTypes.object.isRequired, // from withTheme HOC
  isAnimating: PropTypes.bool.isRequired, // from connect
  locationState: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  withTheme,
  memo,
)(RouteEnterExit);
