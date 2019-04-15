import React, { memo } from 'react';
import { RouteEnterExit } from 'theme';
import HomeSidebar from './HomeSidebar';
import HomeBlocks from './HomeBlocks';
import { HomeRoot } from './Home.styles';

const Home = () => (
  <RouteEnterExit transitionIn="to-left" transitionOut="to-right">
    <HomeRoot>
      <div className="blocks">
        <HomeBlocks />
      </div>
      <div className="sidebar_wrapper">
        <HomeSidebar />
      </div>
    </HomeRoot>
  </RouteEnterExit>
);

export default memo(Home);
