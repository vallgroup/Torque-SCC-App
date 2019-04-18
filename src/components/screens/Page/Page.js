import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { pageSelectors } from 'store/pages';
import { getPage as getPageAction } from 'store/actions';
import { useEnsureFetch } from 'hooks';
import { RouteEnterExit } from 'theme';
import Map from 'components/Map';
import PageImages from './PageImages';
import PageSidebar from './PageSidebar';
import { PageRoot, PageMainWrapper, PageSidebarWrapper } from './Page.styles';

const mapState = (state, props) => ({
  page: pageSelectors.getPageFromRouterMatch(state, props),
});

const mapActions = {
  getPage: getPageAction,
};

const Page = ({ page, getPage }) => {
  const { ID: id, type, map_settings: mapSettings } = page;

  // if we dont have page.type yet, it means we've only run the preliminary page request
  // so now we send the actual request, getting all the page content
  useEnsureFetch(() => {
    if (id) getPage({ id });
  }, !type);

  if (!page) return null;
  return (
    <PageRoot>
      <RouteEnterExit transitionIn="fade" timeoutIn={0} transitionOut="to-left">
        <PageMainWrapper>
          {type === 'map' && <Map settings={mapSettings} />}
          <PageImages />
        </PageMainWrapper>
      </RouteEnterExit>

      <RouteEnterExit transitionIn="to-left" transitionOut="to-right">
        <PageSidebarWrapper>
          <PageSidebar />
        </PageSidebarWrapper>
      </RouteEnterExit>
    </PageRoot>
  );
};

Page.propTypes = {
  page: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired, // from connect
  getPage: PropTypes.func.isRequired, // from connect
};

export default compose(
  connect(
    mapState,
    mapActions,
  ),
  memo,
)(Page);
