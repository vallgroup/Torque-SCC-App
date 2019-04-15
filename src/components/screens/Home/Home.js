import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import HomeSidebar from './HomeSidebar';
import HomeBlocks from './HomeBlocks';
import { HomeRoot, HomeTransition } from './Home.styles';

const mapState = state => ({
  isAnimating: pageSelectors.getIsAnimating(state),
});

const Home = ({ isAnimating }) => (
  <HomeTransition in={!isAnimating} classNames="home" transition="to-right" timeout={1000}>
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

Home.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
};

export default compose(
  connect(
    mapState,
    null,
  ),
  memo,
)(Home);
