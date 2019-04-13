import { createSelector } from 'reselect';

export const getPages = state => state.pages.pages;

const extractPageIdFromProps = (state, props) => props.pageId;

// @see https://github.com/reduxjs/reselect#accessing-react-props-in-selectors
const defaultPage = {};
export const makeGetPageById = () => createSelector(
  [getPages, extractPageIdFromProps],
  (pages, id) => pages.filter(page => page.ID === id) || defaultPage,
);

export const getIsAnimating = state => state.pages.isAnimating;
