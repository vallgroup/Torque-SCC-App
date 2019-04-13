import React, { memo } from 'react';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import HomeSidebar from './HomeSidebar';
import HomeBlocks from './HomeBlocks';
import { HomeRoot, HomeTransition } from './Home.styles';

const mapState = state => ({
  isAnimating: pageSelectors.getIsAnimating(state),
});

const Home = ({ isAnimating }) => {
  console.log(isAnimating);

  return (
    <HomeTransition
      in={!isAnimating}
      classNames="screen-saver-to-left"
      transition="to-left"
      speed={1000}
      timeout={1000}
    >
      <HomeRoot>
        <div className="blocks">
          <HomeBlocks />
        </div>
        <div className="sidebar_wrapper">
          <HomeSidebar />
        </div>
      </HomeRoot>
    </HomeTransition>
  );
};

export default compose(
  connect(
    mapState,
    null,
  ),
  memo,
)(Home);
