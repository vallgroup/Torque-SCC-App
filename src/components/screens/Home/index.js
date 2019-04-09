import React, { memo } from 'react';
import styled from 'styled-components';

const Home = () => (
  <HomeContainer>
    <HomeBlocks />
    <HomeSidebar />
  </HomeContainer>
);

const HomeContainer = styled.div`
  display: flex;
  height: 100%;
`;

const HomeBlocks = styled.div`
  flex: 0 0 87.5%;
`;

const HomeSidebar = styled.div`
  flex: 0 0 12.5%;
  height: 100%;

  background: ${({ theme }) => theme.gradients.vertical(theme.colors.primary, theme.colors.secondary)};
`;

export default memo(Home);
