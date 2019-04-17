import React, { memo, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import { getPage as getPageAction } from 'store/actions';
import { useEnsureFetch } from 'hooks';
import { RouteEnterExit } from 'theme';
import PageImages from './PageImages';
import PageSidebar from './PageSidebar';
import { PageRoot, PageMainWrapper, PageSidebarWrapper } from './Page.styles';

// see @see https://github.com/reduxjs/reselect#accessing-react-props-in-selectors
// for details about including props in make state, while keeping properly memoized selectors
//
const makeMapState = () => {
  const getPageBySlug = pageSelectors.makeGetPageBySlug();

  return (state, { pageSlug }) => ({
    page: getPageBySlug(state, { pageSlug }),
  });
};

const mapActions = {
  getPage: getPageAction,
};

const Page = ({ page, getPage }) => {
  const { ID: id, colors, type, content, images, tabs } = page;

  // if we dont have page.type yet, it means we've only run the preliminary page request
  // so now we send the actual request, getting all the page content
  useEnsureFetch(() => {
    if (id) getPage({ id });
  }, !type);

  const [currentTab, setCurrentTab] = useState(0);

  const currentImages = useMemo(
    () => {
      switch (type) {
        case 'tabbed':
          return tabs?.[currentTab]?.images || []; // eslint-disable-line

        case 'single':
          return images;

        default:
          return [];
      }
    },
    [type, currentTab, images],
  );

  return (
    <PageRoot>
      <RouteEnterExit transitionIn="fade" timeoutIn={0} transitionOut="to-left">
        <PageMainWrapper>
          {currentImages && <PageImages images={currentImages} colors={colors} />}
        </PageMainWrapper>
      </RouteEnterExit>

      <RouteEnterExit transitionIn="to-left" transitionOut="to-right">
        <PageSidebarWrapper>
          <PageSidebar page={page} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </PageSidebarWrapper>
      </RouteEnterExit>
    </PageRoot>
  );
};

Page.propTypes = {
  // we pass this, and connect uses it to get the page from the store
  pageSlug: PropTypes.string.isRequired, // eslint-disable-line
  //
  page: PropTypes.object.isRequired, // from connect
  getPage: PropTypes.func.isRequired, // from connect
};

export default compose(
  connect(
    makeMapState,
    mapActions,
  ),
  memo,
)(Page);
