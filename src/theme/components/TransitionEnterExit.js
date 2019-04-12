import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const DEFAULT_SPEED = 500;

/**
 * Supported types:
 *
 * fade
 * to-left
 */

export default styled(CSSTransition).attrs(props => ({
  classNames: props.classNames.replace(`-${props.transition}`, ''),
  speedIn: props.speedIn || props.speedIn === 0 ? props.speedIn : props.speed || DEFAULT_SPEED,
  speedOut: props.speedOut || props.speedOut === 0 ? props.speedOut : props.speed || DEFAULT_SPEED,
}))`
  /* type: fade */

  &.${({ classNames }) => classNames}-fade-enter {
    opacity: 0;
  }

  &.${({ classNames }) => classNames}-fade-enter-active {
    opacity: 1;
    transition: opacity ${({ speedIn }) => speedIn}ms ease-out;
  }

  &.${({ classNames }) => classNames}-fade-enter-done {
    opacity: 1;
  }

  &.${({ classNames }) => classNames}-fade-exit {
    opacity: 1;
  }

  &.${({ classNames }) => classNames}-fade-exit-active {
    opacity: 0;
    transition: opacity ${({ speedOut }) => speedOut}ms ease-out;
  }

  &.${({ classNames }) => classNames}-fade-exit-done {
    opacity: 0;
  }

  /* type: to-left */

  &.${({ classNames }) => classNames}-to-left-enter {
    left: 100%;
  }

  &.${({ classNames }) => classNames}-to-left-enter-active {
    left: 0;
    transition: left ${({ speedIn }) => speedIn}ms ease-out;
  }

  &.${({ classNames }) => classNames}-to-left-enter-done {
    left: 0;
  }

  &.${({ classNames }) => classNames}-to-left-exit {
    left: 0;
  }

  &.${({ classNames }) => classNames}-to-left-exit-active {
    left: -100%;
    transition: left ${({ speedOut }) => speedOut}ms ease-out;
  }

  &.${({ classNames }) => classNames}-to-left-exit-done {
    left: -100%;
  }
`;
