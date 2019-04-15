import React, { memo } from 'react';
import PropTypes from 'prop-types';
import compose from 'helpers/compose';
import { withTheme } from 'styled-components';
import { StyledTransitionEnterExit } from './TransitionEnterExit.styles';

export const TRANSITION_TYPES = ['fade', 'to-left', 'to-right'];

// see http://reactcommunity.org/react-transition-group/css-transition for extra props
//
// This component is a wrapper for CSSTransition, so we have reusable transition logic

const TransitionEnterExit = ({
  theme,
  children,
  classNames,
  timeout,
  transition,
  transitionIn,
  transitionOut,
  timeoutIn,
  timeoutOut,
  ...CSTransitionProps
}) => {
  const defaultedTimeout = timeout || theme.vars.DEFAULT_ANIMATION_TIMEOUT;

  const transitionInClassName = `${classNames}-${transitionIn || transition}`;
  const transitionOutClassName = `${classNames}-${transitionOut || transition}`;

  const classNamesCustom = {
    enter: `${transitionInClassName}-enter`,
    enterActive: `${transitionInClassName}-enter-active`,
    enterDone: `${transitionInClassName}-enter-done`,
    exit: `${transitionOutClassName}-exit`,
    exitActive: `${transitionOutClassName}-exit-active`,
    exitDone: `${transitionOutClassName}-exit-done`,
  };

  return (
    <StyledTransitionEnterExit
      // for styled component to create relevant classes
      classNameBase={classNames}
      transition={transition}
      timeoutIn={timeoutIn || timeoutIn === 0 ? timeoutIn : defaultedTimeout}
      timeoutOut={timeoutOut || timeoutOut === 0 ? timeoutOut : defaultedTimeout}
      // passed through to CSSTransition
      classNames={classNamesCustom}
      timeout={defaultedTimeout}
      {...CSTransitionProps}
    >
      {children}
    </StyledTransitionEnterExit>
  );
};

TransitionEnterExit.propTypes = {
  theme: PropTypes.object.isRequired, // from withTheme
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string.isRequired,
  transition: PropTypes.oneOf(TRANSITION_TYPES),
  transitionIn: PropTypes.oneOf(TRANSITION_TYPES),
  transitionOut: PropTypes.oneOf(TRANSITION_TYPES),
  timeout: PropTypes.number, // transition duration
  timeoutIn: PropTypes.number, // transition in duration
  timeoutOut: PropTypes.number, // transition out duration
};

TransitionEnterExit.defaultProps = {
  transition: 'fade',
};

export default compose(
  withTheme,
  memo,
)(TransitionEnterExit);
