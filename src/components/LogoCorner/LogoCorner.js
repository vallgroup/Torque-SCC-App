import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { withRouter } from 'react-router-dom';
import { logoSelectors } from 'store/logos';
import { pageSelectors } from 'store/pages';
import { LogoCornerTriangle } from './LogoCorner.styles';

/**
 * Note: requires a relatively positioned parent
 */

const mapState = (state, props) => ({
  colors: pageSelectors.getColors(state, props),
  glenstarIcon: logoSelectors.getGlenstarIcon(state),
});

const LogoCorner = ({ glenstarIcon, colors }) => (
  <LogoCornerTriangle to="/" primaryColor={colors.primary} secondaryColor={colors.secondary}>
    {glenstarIcon && <img src={glenstarIcon} alt="return to home" />}
  </LogoCornerTriangle>
);

LogoCorner.propTypes = {
  glenstarIcon: PropTypes.string.isRequired, // from connect
  colors: PropTypes.object.isRequired, // from connect
};

export default compose(
  withRouter,
  connect(
    mapState,
    null,
  ),
  memo,
)(LogoCorner);
