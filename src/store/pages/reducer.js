import { combineReducers } from 'redux';
import {
  GET_INIT_SUCCESS,
  GET_PAGE_SUCCESS,
  UPDATE_POIS,
  PAGE_ANIMATION_START,
  PAGE_ANIMATION_FINISH,
  SET_CURRENT_TAB,
} from 'store/types';
import mergeArraysOfObjects from 'store/helpers/mergeArraysOfObjects';

const pages = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_INIT_SUCCESS:
    case GET_PAGE_SUCCESS: {
      if (!payload?.success) return state; // eslint-disable-line

      return mergeArraysOfObjects(
        state,
        payload.data.pages,
        (page1, page2) => page1.ID === page2.ID,
      );
    }

    case UPDATE_POIS: {
      const { pageId, tabIndex, pois } = payload;

      // get new tabs array with relevant tabs object updated with new pois
      const pageIndex = state.findIndex(page => page.ID === pageId);
      const newTabs = state[pageIndex].tabs.slice(0);
      newTabs[tabIndex].pois = mergeArraysOfObjects(
        newTabs[tabIndex].pois || [],
        pois || [],
        (poi1, poi2) => poi1.name === poi2.name,
      );

      // create an updates object that we can pass to our 'mergeArraysOfObjects' function
      const pageUpdate = {
        ID: pageId,
        tabs: newTabs,
      };

      return mergeArraysOfObjects(state, [pageUpdate], (page1, page2) => page1.ID === page2.ID);
    }

    default:
      return state;
  }
};

const currentTab = (state = 0, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_TAB:
      return payload;

    default:
      return state;
  }
};

const isAnimating = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case PAGE_ANIMATION_START:
      return true;

    case PAGE_ANIMATION_FINISH:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  pages,
  currentTab,
  isAnimating,
});
