import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export const StyledTransitionEnterExit = styled(CSSTransition).attrs(props => ({
  classNames: props.classNames.replace(`-${props.transition}`, ''),
  timeoutIn: props.timeoutIn || props.timeoutIn === 0 ? props.timeoutIn : props.timeout,
  timeoutOut: props.timeoutOut || props.timeoutOut === 0 ? props.timeoutOut : props.timeout,
}))`
  /* type: fade */

  &.${({ classNames }) => classNames}-fade-enter {
    opacity: 0;
  }

  &.${({ classNames }) => classNames}-fade-enter-active {
    opacity: 1;
    transition: opacity ${({ timeoutIn }) => timeoutIn}ms ease-out;
  }

  &.${({ classNames }) => classNames}-fade-enter-done {
    opacity: 1;
  }

  &.${({ classNames }) => classNames}-fade-exit {
    opacity: 1;
  }

  &.${({ classNames }) => classNames}-fade-exit-active {
    opacity: 0;
    transition: opacity ${({ timeoutOut }) => timeoutOut}ms ease-out;
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
    transition: left ${({ timeoutIn }) => timeoutIn}ms ease-out;
  }

  &.${({ classNames }) => classNames}-to-left-enter-done {
    left: 0;
  }

  &.${({ classNames }) => classNames}-to-left-exit {
    left: 0;
  }

  &.${({ classNames }) => classNames}-to-left-exit-active {
    left: -100%;
    transition: left ${({ timeoutOut }) => timeoutOut}ms ease-out;
  }

  &.${({ classNames }) => classNames}-to-left-exit-done {
    left: -100%;
  }

  /* type: to-right */

  &.${({ classNames }) => classNames}-to-right-enter {
    left: -100%;
  }

  &.${({ classNames }) => classNames}-to-right-enter-active {
    left: 0;
    transition: left ${({ timeoutIn }) => timeoutIn}ms ease-out;
  }

  &.${({ classNames }) => classNames}-to-right-enter-done {
    left: 0;
  }

  &.${({ classNames }) => classNames}-to-right-exit {
    left: 0;
  }

  &.${({ classNames }) => classNames}-to-right-exit-active {
    left: 100%;
    transition: left ${({ timeoutOut }) => timeoutOut}ms ease-out;
  }

  &.${({ classNames }) => classNames}-to-right-exit-done {
    left: 100%;
  }
`;
