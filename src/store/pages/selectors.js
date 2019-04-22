import { createSelector } from 'reselect';

// page selectors using props
//
//
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

export const getPageID = createSelector(
  [getPageFromRouterMatch],
  page => page.ID || 0,
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

// get title
//
const getPageTitle = page => page.post_title || '';

export const getTitle = createSelector(
  [getPageFromRouterMatch],
  getPageTitle,
);

// get tabs
//
const defaultTabIndex = 0;
const defaultTab = null;

export const getCurrentTabIndex = state => state.pages.currentTab || defaultTabIndex;

export const getPageTabs = createSelector(
  [getPageFromRouterMatch],
  page => page.tabs,
);

const getPageCurrentTab = (page, currentTabIndex) => {
  const { type, tabs } = page;

  switch (type) {
    case 'single':
      return null;

    case 'tabbed':
    case 'map':
      return tabs?.[currentTabIndex] || defaultTab;

    default:
      return defaultTab;
  }
};

const getCurrentTab = createSelector(
  [getPageFromRouterMatch, getCurrentTabIndex],
  getPageCurrentTab,
);

// get page/tab images
//
const defaultImages = [];

const getPageImages = (page, currentTab) => {
  const { type } = page;

  switch (type) {
    case 'single':
      return page?.images || defaultImages;

    case 'tabbed':
    case 'map':
      return currentTab?.images || defaultImages;

    default:
      return defaultImages;
  }
};

export const getImages = createSelector(
  [getPageFromRouterMatch, getCurrentTab],
  getPageImages,
);

// get page/tab content
//
const defaultContent = '';

const getPageTabContent = (page, currentTab) => {
  const { type } = page;

  switch (type) {
    case 'single':
      return page?.content || defaultContent;

    case 'tabbed':
    case 'map':
      return currentTab?.content || defaultContent;

    default:
      return defaultContent;
  }
};

export const getTabContent = createSelector(
  [getPageFromRouterMatch, getCurrentTab],
  getPageTabContent,
);

// get page map settings
//
const getPageMapSettings = page => page.map_settings || {};

export const getMapSettings = createSelector(
  [getPageFromRouterMatch],
  getPageMapSettings,
);

const getTabPois = currentTab => {
  if (!currentTab || currentTab.type !== 'pois' || !currentTab.pois) return [];

  const { default_poi_icon: defaultIcon } = currentTab;

  return currentTab.pois.map(poi => {
    if (!poi.icon) poi.icon = defaultIcon; // merge in default icon here so we dont have to worry about it in the components
    return poi;
  });
};

export const getPois = createSelector(
  [getCurrentTab],
  getTabPois,
);

const getTabKeyword = currentTab => {
  if (!currentTab || currentTab.type !== 'pois' || !currentTab.keyword) return '';

  return currentTab.keyword;
};

export const getKeyword = createSelector(
  [getCurrentTab],
  getTabKeyword,
);

const getTabPoiIcon = currentTab => {
  return currentTab?.default_poi_icon;
};

export const getPoiIcon = createSelector(
  [getCurrentTab],
  getTabPoiIcon,
);

const getTabDistanceType = currentTab => {
  return currentTab?.distance_type;
};

export const getDistanceType = createSelector(
  [getCurrentTab],
  getTabDistanceType,
);

// isAnimating selectors

export const getIsAnimating = state => state.pages.isAnimating;
