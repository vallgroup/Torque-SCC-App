import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import LogoCorner from 'components/LogoCorner';
import { H1 } from 'theme';
import PageTabs from './PageTabs';
import ContentSingle from './ContentSingle';
import ContentTabbed from './ContentTabbed';
import { PageSidebarRoot, ContentRoot } from './PageSidebar.styles';

const mapState = (state, props) => ({
  page: pageSelectors.getPageFromRouterMatch(state, props),
  colors: pageSelectors.getColors(state, props),
});

const PageSidebar = ({ page, colors }) => {
  const { post_title: title, type } = page;

  return (
    <PageSidebarRoot>
      <div className="page_tabs_wrapper">
        <PageTabs />
      </div>

      <div className="content_wrapper">
        <ContentRoot primary={colors.primary} secondary={colors.secondary}>
          <H1>{title}</H1>
          {(() => {
            switch (type) {
              case 'single':
                return <ContentSingle />;

              case 'tabbed':
              case 'map':
                return <ContentTabbed />;

              default:
                return null;
            }
          })()}
        </ContentRoot>
      </div>

      <LogoCorner />
    </PageSidebarRoot>
  );
};

PageSidebar.propTypes = {
  page: PropTypes.object.isRequired, // from connect
  colors: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(PageSidebar);
