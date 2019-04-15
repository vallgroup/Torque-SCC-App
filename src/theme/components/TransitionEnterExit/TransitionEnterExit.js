import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyledTransitionEnterExit } from './TransitionEnterExit.styles';

const DEFAULT_TIMEOUT = 500;

export const TRANSITION_TYPES = ['fade', 'to-left', 'to-right'];

// see http://reactcommunity.org/react-transition-group/css-transition for extra props
//
// This component is a wrapper for CSSTransition, so we have reusable transition logic

const TransitionEnterExit = ({
  classNames,
  transition,
  children,
  timeout,
  timeoutIn,
  timeoutOut,
  ...CSTransitionProps
}) => (
  <StyledTransitionEnterExit
    classNames={`${classNames}-${transition}`}
    transition={transition}
    timeout={timeout}
    timeoutIn={timeoutIn}
    timeoutOut={timeoutOut}
    {...CSTransitionProps}
  >
    {children}
  </StyledTransitionEnterExit>
);

TransitionEnterExit.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string.isRequired,
  transition: PropTypes.oneOf(TRANSITION_TYPES),
  timeout: PropTypes.number, // transition duration
  timeoutIn: PropTypes.number, // transition in duration
  timeoutOut: PropTypes.number, // transition out duration
};

TransitionEnterExit.defaultProps = {
  transition: 'fade',
  timeout: DEFAULT_TIMEOUT,
};

export default memo(TransitionEnterExit);
