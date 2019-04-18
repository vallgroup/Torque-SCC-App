import React, { memo } from 'react';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { PageNavRoot, PageNavTab } from './PageNav.styles';

const mapState = state => ({
  pages: pageSelectors.getPages(state),
});

const PageNav = ({ match, pages }) => (
  <PageNavRoot>
    {pages.map(({ ID: id, post_name: slug, colors, icons }) => {
      const isCurrentPage = match?.params?.pageSlug === slug; // eslint-disable-line

      const icon = isCurrentPage ? icons?.icon_empty : icons?.icon_filled; // eslint-disable-line

      return (
        <PageNavTab
          key={id}
          to={slug}
          color={colors?.primary_color} // eslint-disable-line
        >
          {icon && <img src={icon} />}
        </PageNavTab>
      );
    })}
  </PageNavRoot>
);

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(PageNav);
