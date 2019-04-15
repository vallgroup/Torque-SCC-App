import { GET_SCREEN_SAVER_SUCCESS } from 'store/types';

export default (state = [], action) => {
  const { type, payload } = action;

  if (!payload?.success) return state; // eslint-disable-line

  switch (type) {
    case GET_SCREEN_SAVER_SUCCESS:
      return payload.data;

    default:
      return state;
  }
};
