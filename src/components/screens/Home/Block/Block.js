import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BlockRoot, BackgroundIcon } from './Block.styles';

const Block = ({
  title, slug, iconFilled, iconEmpty, primary, secondary,
}) => (
  <BlockRoot primary={primary} secondary={secondary} to={`/${slug}`}>
    {iconFilled && <BackgroundIcon src={iconFilled} primary={primary} secondary={secondary} />}
    {iconEmpty && (
      <img src={iconEmpty} className="title_icon" alt="icon representing block title" />
    )}
    {title && <div className="block_heading">{title}</div>}
  </BlockRoot>
);

Block.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string.isRequired,
  iconFilled: PropTypes.string,
  iconEmpty: PropTypes.string,
  primary: PropTypes.string,
  secondary: PropTypes.string,
};

export default memo(Block);
