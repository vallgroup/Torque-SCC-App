import { createSelector } from 'reselect';

export const getGlenstarLogos = state => state.logos.glenstar_logos || {};

export const getGlenstarText = createSelector(
  [getGlenstarLogos],
  glenstarLogos => glenstarLogos.text_logo || '',
);

export const getGlenstarIcon = createSelector(
  [getGlenstarLogos],
  glenstarLogos => glenstarLogos.icon || '',
);

export const getCertifications = state => state.logos.certifications || [];
