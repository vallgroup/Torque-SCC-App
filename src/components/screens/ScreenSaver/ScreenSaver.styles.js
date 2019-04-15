import styled from 'styled-components';

export const ScreenSaverRoot = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.black};
`;
