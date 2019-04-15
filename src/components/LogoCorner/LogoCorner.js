import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { logoSelectors } from 'store/logos';
import { LogoCornerTriangle } from './LogoCorner.styles';

/**
 * Note: requires a relatively positioned parent
 */

const mapState = state => ({
  glenstarIcon: logoSelectors.getGlenstarIcon(state),
});

const LogoCorner = ({ glenstarIcon, primaryColor, secondaryColor }) => (
  <LogoCornerTriangle to="/" primaryColor={primaryColor} secondaryColor={secondaryColor}>
    {glenstarIcon && <img src={glenstarIcon} alt="return to home" />}
  </LogoCornerTriangle>
);

LogoCorner.propTypes = {
  glenstarIcon: PropTypes.string.isRequired, // from connect
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
};

export default compose(
  connect(
    mapState,
    null,
  ),
  memo,
)(LogoCorner);
