import styled from 'styled-components';

export const HomeRoot = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

export const Blocks = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 87.5%;
  height: 100%;
`;

export const BlockSizing = styled.div`
  position: absolute;
  top: 0;
  height: 50%;
  width: 33.3333%;

  &:nth-child(1) {
    z-index: 5;

    left: 0;
    height: 100%;

    &[class*='-to-left-enter'] {
      left: 100%;
    }

    &[class*='-to-left-enter-active'] {
      left: 0;
    }

    &[class*='-to-left-enter-done'] {
      left: 0;
    }
  }

  &:nth-child(2),
  &:nth-child(3) {
    z-index: 4;
    left: 33.333%;

    &[class*='-to-left-enter'] {
      left: 100%;
    }

    &[class*='-to-left-enter-active'] {
      left: 33.333%;
    }

    &[class*='-to-left-enter-done'] {
      left: 33.333%;
    }
  }

  &:nth-child(3) {
    top: 50%;
  }

  &:nth-child(4),
  &:nth-child(5) {
    z-index: 3;
    left: 66.666%;

    &[class*='-to-left-enter'] {
      left: 100%;
    }

    &[class*='-to-left-enter-active'] {
      left: 66.666%;
    }

    &[class*='-to-left-enter-done'] {
      left: 66.666%;
    }
  }

  &:nth-child(5) {
    top: 50%;
  }

  &:nth-child(n + 6) {
    display: none;
  }
`;

export const SidebarSizing = styled.div`
  position: absolute;
  top: 0;
  left: 87.5%;
  width: 12.5%;
  height: 100%;

  &[class*='-to-left-enter-active'] {
    left: 87.5%;
  }

  &[class*='-to-left-enter-done'] {
    left: 87.5%;
  }
`;
