import { combineReducers } from 'redux';
import {
  GET_INIT_SUCCESS,
  GET_PAGE_SUCCESS,
  PAGE_ANIMATION_START,
  PAGE_ANIMATION_FINISH,
} from 'store/types';
import mergeArraysOfObjects from 'store/helpers/mergeArraysOfObjects';

const pages = (state = [], action) => {
  const { type, payload } = action;

  if (!payload?.success) return state; // eslint-disable-line

  switch (type) {
    case GET_INIT_SUCCESS:
    case GET_PAGE_SUCCESS:
      return mergeArraysOfObjects(
        state,
        payload.data.pages,
        (page1, page2) => page1.ID === page2.ID,
      );

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
  isAnimating,
});
