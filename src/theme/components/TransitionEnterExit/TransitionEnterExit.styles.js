import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export const StyledTransitionEnterExit = styled(CSSTransition)`
  /* type: fade */

  &.${({ classNameBase }) => classNameBase}-fade-enter {
    opacity: 0;
  }

  &.${({ classNameBase }) => classNameBase}-fade-enter-active {
    opacity: 1;
    transition: opacity ${({ timeoutIn }) => timeoutIn}ms ease-out;
  }

  &.${({ classNameBase }) => classNameBase}-fade-enter-done {
    opacity: 1;
  }

  &.${({ classNameBase }) => classNameBase}-fade-exit {
    opacity: 1;
  }

  &.${({ classNameBase }) => classNameBase}-fade-exit-active {
    opacity: 0;
    transition: opacity ${({ timeoutOut }) => timeoutOut}ms ease-out;
  }

  &.${({ classNameBase }) => classNameBase}-fade-exit-done {
    opacity: 0;
  }

  /* type: to-left */

  &.${({ classNameBase }) => classNameBase}-to-left-enter {
    left: 100%;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-enter-active {
    left: 0;
    transition: left ${({ timeoutIn }) => timeoutIn}ms ease-out;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-enter-done {
    left: 0;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-exit {
    left: 0;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-exit-active {
    left: -100%;
    transition: left ${({ timeoutOut }) => timeoutOut}ms ease-out;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-exit-done {
    left: -100%;
  }

  /* type: to-right */

  &.${({ classNameBase }) => classNameBase}-to-right-enter {
    left: -100%;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-enter-active {
    left: 0;
    transition: left ${({ timeoutIn }) => timeoutIn}ms ease-out;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-enter-done {
    left: 0;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-exit {
    left: 0;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-exit-active {
    left: 100%;
    transition: left ${({ timeoutOut }) => timeoutOut}ms ease-out;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-exit-done {
    left: 100%;
  }
`;
