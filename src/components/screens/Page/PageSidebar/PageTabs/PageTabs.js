import React, { memo } from 'react';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { PageTabsRoot, PageTab } from './PageTabs.styles';

const mapState = state => ({
  pages: pageSelectors.getPages(state),
});

const PageTabs = ({ match, pages }) => (
  <PageTabsRoot>
    {pages.map(({ ID: id, post_name: slug, colors, icons }) => {
      const isCurrentPage = match?.params?.pageSlug === slug; // eslint-disable-line

      const icon = isCurrentPage ? icons?.icon_empty : icons?.icon_filled; // eslint-disable-line

      return (
        <PageTab
          key={id}
          to={slug}
          color={colors?.primary_color} // eslint-disable-line
        >
          {icon && <img src={icon} />}
        </PageTab>
      );
    })}
  </PageTabsRoot>
);

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(PageTabs);
