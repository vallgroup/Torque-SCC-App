import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import LogoCorner from 'components/LogoCorner';
import { H1 } from 'theme';
import PageNav from './PageNav';
import TabContent from './TabContent';
import Tabs from './Tabs';
import { PageSidebarRoot, ContentRoot } from './PageSidebar.styles';

const mapState = (state, props) => ({
  title: pageSelectors.getTitle(state, props),
  colors: pageSelectors.getColors(state, props),
});

const PageSidebar = ({ title, colors }) => (
  <PageSidebarRoot>
    <div className="page_nav_wrapper">
      <PageNav />
    </div>

    <div className="content_wrapper">
      <ContentRoot primary={colors.primary} secondary={colors.secondary}>
        <H1>{title}</H1>
        <Tabs />
        <TabContent />
      </ContentRoot>
    </div>

    <LogoCorner />
  </PageSidebarRoot>
);

PageSidebar.propTypes = {
  title: PropTypes.string.isRequired, // from connect
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
