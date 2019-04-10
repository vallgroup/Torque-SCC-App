import { createSelector } from 'reselect';

const getLogos = state => state.logos;

export const getGlenstarLogos = createSelector(
  [getLogos],
  logos => logos.glenstar_logos,
);

export const getGlenstarText = createSelector(
  [getGlenstarLogos],
  glenstarLogos => glenstarLogos.text_logo,
);

export const getGlenstarIcon = createSelector(
  [getGlenstarLogos],
  glenstarLogos => glenstarLogos.icon,
);

export const getCertifications = createSelector(
  [getLogos],
  logos => logos.certifications,
);
