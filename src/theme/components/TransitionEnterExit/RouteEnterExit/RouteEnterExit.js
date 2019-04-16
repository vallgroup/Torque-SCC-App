import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withTheme } from 'styled-components';
import { pageSelectors } from 'store/pages';
import TransitionEnterExit from '../TransitionEnterExit';

const mapState = state => ({
  isAnimating: pageSelectors.getIsAnimating(state),
});

const RouteEnterExit = ({
  theme, isAnimating, children, ...TransitionEnterExitProps
}) => (
  <TransitionEnterExit
    in={!isAnimating}
    classNames="route"
    timeout={theme.vars.SWITCH_DELAY}
    mountOnEnter
    {...TransitionEnterExitProps}
  >
    {children}
  </TransitionEnterExit>
);

RouteEnterExit.propTypes = {
  theme: PropTypes.object.isRequired, // from withTheme HOC
  isAnimating: PropTypes.bool.isRequired, // from connect
  children: PropTypes.node.isRequired,
};

export default compose(
  connect(
    mapState,
    null,
  ),
  withTheme,
  memo,
)(RouteEnterExit);
