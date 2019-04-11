import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import { init } from 'store/actions';
import { useEnsureFetch } from 'hooks';
import Block from './Block';
import { HomeBlocksRoot } from './HomeBlocks.styles';

const mapState = state => ({
  pages: pageSelectors.getPages(state),
});

const mapActions = {
  init,
};

const HomeBlocks = ({ pages }) => {
  useEnsureFetch(init, pages.length);

  return (
    <HomeBlocksRoot>
      {pages.map(({
        ID, post_title: title, post_name: slug, icons, colors,
      }) => (
        <Block
          key={ID}
          title={title}
          slug={slug}
          iconFilled={icons.icon_filled}
          iconEmpty={icons.icon_empty}
          primary={colors.primary_color}
          secondary={colors.secondary_color}
        />
      ))}
    </HomeBlocksRoot>
  );
};

HomeBlocks.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default compose(
  connect(
    mapState,
    mapActions,
  ),
  memo,
)(HomeBlocks);
