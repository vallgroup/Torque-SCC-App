import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import { init } from 'store/actions';
import { useEnsureFetch } from 'hooks';
import HomeSidebar from './HomeSidebar';
import { HomeContainer } from './Home.styles';

const mapState = state => ({
  pages: pageSelectors.getPages(state),
});

const mapActions = {
  init,
};

const Home = ({ pages }) => {
  useEnsureFetch(init, pages.length);

  return (
    <HomeContainer>
      <div className="blocks" />
      <div className="sidebar_wrapper">
        <HomeSidebar />
      </div>
    </HomeContainer>
  );
};

Home.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default compose(
  connect(
    mapState,
    mapActions,
  ),
  memo,
)(Home);
