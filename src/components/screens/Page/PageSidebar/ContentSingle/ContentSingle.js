import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ContentRoot } from './ContentSingle.styles';

const ContentSingle = ({ content }) => (content ? <ContentRoot dangerouslySetInnerHTML={{ __html: content }} /> : null);

ContentSingle.propTypes = {
  content: PropTypes.string,
};

export default memo(ContentSingle);
