import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export const slideClassName = 'slide';
export const slideTimeout = 1000;

export const SlideshowRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = styled(CSSTransition)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;

  /* fade transitions */

  &.${slideClassName}-fade-enter {
    opacity: 0;
  }

  &.${slideClassName}-fade-enter-active {
    opacity: 1;
    transition: opacity ${slideTimeout}ms ease-out;
  }

  &.${slideClassName}-fade-enter-done {
    opacity: 1;
  }

  &.${slideClassName}-fade-exit {
    opacity: 1;
  }

  &.${slideClassName}-fade-exit-active {
    opacity: 0;
    transition: opacity ${slideTimeout}ms ease-out;
  }

  &.${slideClassName}-fade-exit-done {
    opacity: 0;
  }

  /* slide transitions */

  &.${slideClassName}-slide-enter {
    left: 100%;
  }

  &.${slideClassName}-slide-enter-active {
    left: 0;
    transition: left ${slideTimeout}ms ease-out;
  }

  &.${slideClassName}-slide-enter-done {
    left: 0;
  }

  &.${slideClassName}-slide-exit {
    left: 0;
  }

  &.${slideClassName}-slide-exit-active {
    left: -100%;
    transition: left ${slideTimeout}ms ease-out;
  }

  &.${slideClassName}-slide-exit-done {
    left: -100%;
  }
`;
