import React, { memo } from 'react';
import LogoCorner from 'components/LogoCorner';
import { H1 } from 'theme';
import PageTabs from './PageTabs';
import ContentSingle from './ContentSingle';
import ContentTabbed from './ContentTabbed';
import { PageSidebarRoot, ContentRoot } from './PageSidebar.styles';

const PageSidebar = ({ page, currentTab, setCurrentTab }) => {
  const { post_title: title, colors, type, tabs, content } = page;

  return (
    <PageSidebarRoot>
      <div className="page_tabs_wrapper">
        <PageTabs />
      </div>

      <div className="content_wrapper">
        <ContentRoot
          primary={colors?.primary_color} // eslint-disable-line
          secondary={colors?.secondary_color} // eslint-disable-line
        >
          <H1>{title}</H1>
          {(() => {
            switch (type) {
              case 'single':
                return <ContentSingle content={content} />;

              case 'tabbed':
              case 'map':
                return (
                  <ContentTabbed
                    primary={colors?.primary_color} // eslint-disable-line
                    type={type}
                    tabs={tabs}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                  />
                );

              default:
                return null;
            }
          })()}
        </ContentRoot>
      </div>

      <LogoCorner
        primaryColor={colors?.primary_color} // eslint-disable-line
        secondaryColor={colors?.secondary_color} // eslint-disable-line
      />
    </PageSidebarRoot>
  );
};

export default memo(PageSidebar);
