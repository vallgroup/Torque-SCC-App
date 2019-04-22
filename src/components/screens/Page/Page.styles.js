import styled from 'styled-components';

export const PageRoot = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const PageMainWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 66.666%;
  height: 100%;
`;

export const PageSidebarWrapper = styled.div`
  position: absolute;
  left: 66.666%;
  top: 0;
  width: 33.333%;
  height: 100%;

  &[class*='-to-left-enter'] {
    left: 100%;
  }

  &[class*='-to-left-enter-active'] {
    left: 66.666%;
  }

  &[class*='-to-left-enter-done'] {
    left: 66.666%;
  }

  &[class*='-to-right-exit'] {
    left: 66.666%;
  }

  &[class*='-to-right-exit-active'] {
    left: 100%;
  }

  &[class*='-to-right-exit-done'] {
    left: 100%;
  }
`;
