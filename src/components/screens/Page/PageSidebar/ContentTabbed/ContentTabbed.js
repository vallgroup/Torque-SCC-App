import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ContentTabbedRoot, Tab } from './ContentTabbed.styles';

const ContentTabbed = ({
  tabs, primary, currentTab, setCurrentTab,
}) => {
  const handleClick = index => () => setCurrentTab(index);

  const tab = tabs[currentTab];

  return (
    <ContentTabbedRoot>
      <div className="tabs_wrapper">
        {tabs.map(({ heading }, index) => {
          const isCurrentTab = index === currentTab;

          return (
            <Tab
              onClick={handleClick(index)}
              className={classnames({ active: isCurrentTab })}
              color={primary}
            >
              {heading}
            </Tab>
          );
        })}
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: tab.content }} />
    </ContentTabbedRoot>
  );
};

ContentTabbed.propTypes = {
  tabs: PropTypes.array.isRequired,
  primary: PropTypes.string,
  currentTab: PropTypes.number.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};

export default memo(ContentTabbed);
