import styled from 'styled-components';
import { TransitionEnterExit } from 'theme';

export const HomeTransition = styled(TransitionEnterExit)`
  position: absolute;
  left: 0;
  top: 0;
`;

export const HomeRoot = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  .blocks {
    flex: 0 0 87.5%;
    height: 100%;
  }

  .sidebar_wrapper {
    flex: 0 0 12.5%;
    height: 100%;
  }
`;
