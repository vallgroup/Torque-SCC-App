import styled from 'styled-components';
import { TransitionEnterExit } from 'theme';

export const ScreenSaverRoot = styled(TransitionEnterExit)`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.black};
`;
