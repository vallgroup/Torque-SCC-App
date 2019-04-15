import { createSelector } from 'reselect';

// page selectors

export const getPages = state => state.pages.pages;

const extractPageIdFromProps = (state, props) => props.pageId;
const extractPageSlugFromProps = (state, props) => props.pageSlug;

// @see https://github.com/reduxjs/reselect#accessing-react-props-in-selectors

const defaultPage = {};
export const makeGetPageById = () => createSelector(
  [getPages, extractPageIdFromProps],
  (pages, id) => pages.filter(page => page.ID === id)[0] || defaultPage,
);

export const makeGetPageBySlug = () => createSelector(
  [getPages, extractPageSlugFromProps],
  (pages, slug) => pages.filter(page => page.post_name === slug)[0] || defaultPage,
);

// isAnimating selectors

export const getIsAnimating = state => state.pages.isAnimating;
