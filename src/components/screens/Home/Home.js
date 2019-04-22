import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import { init } from 'store/actions';
import { useEnsureFetch } from 'hooks';
import { RouteEnterExit } from 'theme';
import Block from './Block';
import HomeSidebar from './HomeSidebar';
import {
  HomeRoot, Blocks, BlockSizing, SidebarSizing,
} from './Home.styles';

const mapState = state => ({
  pages: pageSelectors.getPages(state),
});

const mapActions = {
  init,
};

const Home = ({ pages }) => {
  useEnsureFetch(init, pages.length);

  return (
    <HomeRoot>
      <Blocks>
        {pages.map(({
          ID, post_title: title, post_name: slug, icons, colors,
        }) => (
          <RouteEnterExit key={ID} transitionIn="to-left" transitionOut="to-right">
            <BlockSizing>
              <Block
                title={title}
                slug={slug}
                iconFilled={icons.icon_filled}
                iconEmpty={icons.icon_empty}
                primary={colors.primary_color}
                secondary={colors.secondary_color}
              />
            </BlockSizing>
          </RouteEnterExit>
        ))}
      </Blocks>

      <RouteEnterExit transitionIn="to-left" transitionOut="to-right">
        <SidebarSizing>
          <HomeSidebar />
        </SidebarSizing>
      </RouteEnterExit>
    </HomeRoot>
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
