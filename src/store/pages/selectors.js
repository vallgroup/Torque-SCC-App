import { createSelector } from 'reselect';

// page selectors
// @see https://github.com/reduxjs/reselect#accessing-react-props-in-selectors

export const getPages = state => state.pages.pages;

const extractPageSlugFromMatchProps = (state, props) => props?.match?.params?.pageSlug; // eslint-disable-line

// get page using react router 'match'
//
// note:
// usually we would want to create a new instance of the selector for each instance of 'mapStateToProps',
// so as not to break memoization when the props change,
// but since we KNOW the pageSlug is coming from the router, and will be the same in the props of each component,
// we actually benefit more from just using a single shared selector.
//
// See the link above for more info on memoization of selectors
//
const defaultPage = false;
export const getPageFromRouterMatch = createSelector(
  [getPages, extractPageSlugFromMatchProps],
  (pages, slug) => pages.filter(page => page.post_name === slug)[0] || defaultPage,
);

// get colors object
//
const getPageColors = page => ({
  primary: page?.colors?.primary_color,
  secondary: page?.colors?.secondary_color,
});

export const getColors = createSelector(
  [getPageFromRouterMatch],
  getPageColors,
);

// get current tab
//
const defaultTabIndex = 0;
const defaultTab = null;

export const getCurrentTabIndex = state => state.pages.currentTab || defaultTabIndex;

export const getPageTabs = createSelector(
  [getPageFromRouterMatch],
  page => page.tabs,
);

export const getPageCurrentTab = (page, currentTabIndex) => {
  const { type, tabs } = page;

  switch (type) {
    case 'single':
      return null;

    case 'tabbed':
    case 'map':
      return tabs[currentTabIndex];

    default:
      return defaultTab;
  }
};

const getCurrentTab = createSelector(
  [getPageFromRouterMatch, getCurrentTabIndex],
  getPageCurrentTab,
);

// get page images
//
const defaultImages = [];

export const getPageImages = (page, currentTab) => {
  const { type } = page;

  switch (type) {
    case 'single':
      return page.images || defaultImages;

    case 'tabbed':
    case 'map':
      return currentTab.images || defaultImages;

    default:
      return defaultImages;
  }
};

export const getImages = createSelector(
  [getPageFromRouterMatch, getCurrentTab],
  getPageImages,
);

// isAnimating selectors

export const getIsAnimating = state => state.pages.isAnimating;
