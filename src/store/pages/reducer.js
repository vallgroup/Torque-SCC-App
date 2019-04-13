import { combineReducers } from 'redux';
import {
  GET_INIT_SUCCESS,
  GET_PAGE_SUCCESS,
  PAGE_ANIMATION_START,
  PAGE_ANIMATION_FINISH,
} from 'store/types';
import unionBy from 'lodash.unionby';

const pages = (state = [], action) => {
  const { type, payload } = action;

  if (!payload?.success) return state; // eslint-disable-line

  switch (type) {
    case GET_INIT_SUCCESS:
    case GET_PAGE_SUCCESS:
      return unionBy(state, payload.data.pages, 'ID');

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
