import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

//
//
// note, exits must always have higher priority than enters
// to allow us to change the transition while it's rendered
//
//
export const StyledTransitionEnterExit = styled(CSSTransition)`
  /* type: fade enter */

  &.${({ classNameBase }) => classNameBase}-fade-enter {
    opacity: 0;
  }

  &.${({ classNameBase }) => classNameBase}-fade-enter-active {
    opacity: 1;
    transition: opacity ${({ timeoutIn }) => timeoutIn}ms ease-in;
  }

  &.${({ classNameBase }) => classNameBase}-fade-enter-done {
    opacity: 1;
  }

  /* type: to-left enter */

  &.${({ classNameBase }) => classNameBase}-to-left-enter {
    left: 100%;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-enter-active {
    left: 0;
    transition: left ${({ timeoutIn }) => timeoutIn}ms ease-in;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-enter-done {
    left: 0;
  }

  /* type: to-right enter */

  &.${({ classNameBase }) => classNameBase}-to-right-enter {
    left: -100%;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-enter-active {
    left: 0;
    transition: left ${({ timeoutIn }) => timeoutIn}ms ease-in;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-enter-done {
    left: 0;
  }

  /* type: fade exit */

  &.${({ classNameBase }) => classNameBase}-fade-exit {
    opacity: 1;
  }

  &.${({ classNameBase }) => classNameBase}-fade-exit-active {
    opacity: 0;
    transition: opacity ${({ timeoutOut }) => timeoutOut}ms ease-in;
  }

  &.${({ classNameBase }) => classNameBase}-fade-exit-done {
    opacity: 0;
  }

  /* type: to-left exit */

  &.${({ classNameBase }) => classNameBase}-to-left-exit {
    left: 0;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-exit-active {
    left: -100%;
    transition: left ${({ timeoutOut }) => timeoutOut}ms ease-in;
  }

  &.${({ classNameBase }) => classNameBase}-to-left-exit-done {
    left: -100%;
  }

  /* type: to-right exit */

  &.${({ classNameBase }) => classNameBase}-to-right-exit {
    left: 0;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-exit-active {
    left: 100%;
    transition: left ${({ timeoutOut }) => timeoutOut}ms ease-in;
  }

  &.${({ classNameBase }) => classNameBase}-to-right-exit-done {
    left: 100%;
  }
`;
