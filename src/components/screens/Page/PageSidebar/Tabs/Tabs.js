import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { setCurrentTab as setCurrentTabAction } from 'store/actions';
import classnames from 'classnames';
import { TabsRoot, Tab } from './Tabs.styles';

const mapState = (state, props) => ({
  tabs: pageSelectors.getPageTabs(state, props),
  currentTabIndex: pageSelectors.getCurrentTabIndex(state),
  colors: pageSelectors.getColors(state, props),
});

const mapActions = {
  setCurrentTab: setCurrentTabAction,
};

const Tabs = ({ tabs, colors, currentTabIndex, setCurrentTab }) => {
  // reset tab index if tabs change
  useEffect(
    () => {
      setCurrentTab(0);
    },
    [tabs, setCurrentTab],
  );

  // create a click handler for each index
  const handleClick = index => () => setCurrentTab(index);

  if (!tabs?.length) return null;
  return (
    <TabsRoot>
      {tabs.map(({ heading }, index) => {
        const isCurrentTab = index === currentTabIndex;

        return (
          <Tab
            key={heading}
            onClick={handleClick(index)}
            className={classnames({ active: isCurrentTab })}
            color={colors.primary}
          >
            {heading}
          </Tab>
        );
      })}
    </TabsRoot>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array, // from connect
  colors: PropTypes.object.isRequired, // from connect
  currentTabIndex: PropTypes.number.isRequired, // from connect
  setCurrentTab: PropTypes.func.isRequired, // from connect
};

export default compose(
  withRouter,
  connect(
    mapState,
    mapActions,
  ),
  memo,
)(Tabs);
