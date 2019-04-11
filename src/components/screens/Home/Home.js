import React, { memo } from 'react';
import HomeSidebar from './HomeSidebar';
import HomeBlocks from './HomeBlocks';
import { HomeRoot } from './Home.styles';

const Home = () => (
  <HomeRoot>
    <div className="blocks">
      <HomeBlocks />
    </div>
    <div className="sidebar_wrapper">
      <HomeSidebar />
    </div>
  </HomeRoot>
);

export default memo(Home);
