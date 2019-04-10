import { GET_INIT_SUCCESS, GET_PAGE_SUCCESS } from 'store/types';
import unionBy from 'lodash.unionby';

export default (state = [], action) => {
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
