import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { logoSelectors } from 'store/logos';
import { withTheme } from 'styled-components';
import LogoCorner from 'components/LogoCorner';
import { HomeSidebarRoot, Certification } from './HomeSidebar.styles';

const mapState = state => ({
  glenstarText: logoSelectors.getGlenstarText(state),
  certifications: logoSelectors.getCertifications(state),
});

const HomeSidebar = ({ glenstarText, certifications, theme }) => (
  <HomeSidebarRoot>
    <div className="text_logo_wrapper">{glenstarText && <img src={glenstarText} alt="logo" />}</div>

    <div className="certifications_wrapper">
      {certifications.map(({ logo }) => {
        if (logo) {
          return <Certification key={logo} numCertifications={certifications.length} src={logo} />;
        }
        return null;
      })}
    </div>

    <LogoCorner primaryColor={theme.colors.primary} secondaryColor={theme.colors.secondary} />
  </HomeSidebarRoot>
);

HomeSidebar.propTypes = {
  glenstarText: PropTypes.string.isRequired, // from connect
  certifications: PropTypes.array.isRequired, // from connect
  theme: PropTypes.object.isRequired, // from withTheme
};

export default compose(
  connect(
    mapState,
    null,
  ),
  withTheme,
  memo,
)(HomeSidebar);
