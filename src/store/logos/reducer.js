import { GET_INIT_SUCCESS } from 'store/types';
import merge from 'lodash.merge';

export default (state = {}, action) => {
  const { type, payload } = action;

  if (!payload?.success) return state; // eslint-disable-line

  switch (type) {
    case GET_INIT_SUCCESS:
      return merge(state, payload.data.logos);

    default:
      return state;
  }
};
