import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { pageSelectors } from 'store/pages';
import { ContentRoot } from './TabContent.styles';

const mapState = (state, props) => ({
  content: pageSelectors.getTabContent(state, props),
});

const TabContent = ({ content }) => (content ? <ContentRoot dangerouslySetInnerHTML={{ __html: content }} /> : null);

TabContent.propTypes = {
  content: PropTypes.string,
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(TabContent);
