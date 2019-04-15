import React, { memo } from 'react';
import LogoCorner from 'components/LogoCorner';
import { H1 } from 'theme';
import PageTabs from './PageTabs';
import { PageSidebarRoot, ContentRoot } from './PageSidebar.styles';

const PageSidebar = ({ page }) => {
  const { post_title: title, colors, type } = page;

  return (
    <PageSidebarRoot>
      <div className="page_tabs_wrapper">
        <PageTabs />
      </div>

      <div className="content_wrapper">
        <ContentRoot primary={colors?.primary_color} secondary={colors?.secondary_color}>
          <H1>{title}</H1>
        </ContentRoot>
      </div>

      <LogoCorner primaryColor={colors?.primary_color} secondaryColor={colors?.secondary_color} />
    </PageSidebarRoot>
  );
};

export default memo(PageSidebar);
