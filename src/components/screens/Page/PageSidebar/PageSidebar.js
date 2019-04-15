import React, { memo } from 'react';
import LogoCorner from 'components/LogoCorner';
import { H1 } from 'theme';
import { PageSidebarRoot, ContentRoot } from './PageSidebar.styles';

const PageSidebar = ({
  title, primary, secondary, type,
}) => (
  <PageSidebarRoot>
    <div className="page_tabs_wrapper" />

    <div className="content_wrapper">
      <ContentRoot primary={primary} secondary={secondary}>
        <H1>{title}</H1>
      </ContentRoot>
    </div>

    <LogoCorner primaryColor={primary} secondaryColor={secondary} />
  </PageSidebarRoot>
);

export default memo(PageSidebar);
