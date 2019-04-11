import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export const transitionGroupClassName = 'screen-saver';
export const transitionGroupTimeout = 1000;

export const ScreenSaverRoot = styled(CSSTransition)`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.black};

  transition: opacity ${transitionGroupTimeout}ms;

  &.${transitionGroupClassName}-enter {
    opacity: 0;
  }

  &.${transitionGroupClassName}-enter-active {
    opacity: 1;
  }

  &.${transitionGroupClassName}-enter-done {
    opacity: 1;
  }

  &.${transitionGroupClassName}-exit {
    opacity: 1;
  }

  &.${transitionGroupClassName}-exit-active {
    opacity: 0;
  }

  &.${transitionGroupClassName}-exit-done {
    opacity: 0;
  }
`;
