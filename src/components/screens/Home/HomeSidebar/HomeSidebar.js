import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { logoSelectors } from 'store/logos';
import LogoCorner from 'components/LogoCorner';
import { HomeSidebarRoot, Certification } from './HomeSidebar.styles';

const mapState = state => ({
  glenstarText: logoSelectors.getGlenstarText(state),
  certifications: logoSelectors.getCertifications(state),
});

const HomeSidebar = ({ glenstarText, certifications }) => (
  <HomeSidebarRoot>
    <div className="text_logo_wrapper">{glenstarText && <img src={glenstarText} alt="logo" />}</div>

    <div className="certifications_wrapper">
      {certifications.map(({ logo }) => (logo ? (
        <Certification key={logo} numCertifications={certifications.length} src={logo} />
      ) : null))}
    </div>

    <LogoCorner />
  </HomeSidebarRoot>
);

HomeSidebar.propTypes = {
  glenstarText: PropTypes.string.isRequired, // from connect
  certifications: PropTypes.array.isRequired, // from connect
};

export default compose(
  connect(
    mapState,
    null,
  ),
  memo,
)(HomeSidebar);
