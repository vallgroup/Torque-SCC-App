import { RSAA } from 'redux-api-middleware';
import createEndpoint from 'store/helpers/createEndpoint';
import {
  GET_INIT_REQUEST,
  GET_INIT_SUCCESS,
  GET_INIT_FAILURE,
  GET_PAGE_REQUEST,
  GET_PAGE_SUCCESS,
  GET_PAGE_FAILURE,
  GET_SCREEN_SAVER_REQUEST,
  GET_SCREEN_SAVER_SUCCESS,
  GET_SCREEN_SAVER_FAILURE,
  SET_CURRENT_TAB,
  PAGE_ANIMATION_START,
  PAGE_ANIMATION_FINISH,
} from 'store/types';

/**
 * @see https://www.npmjs.com/package/redux-api-middleware#introduction for more info on the redux api middleware pattern
 *
 * In essence:
 * we give the action creator 3 types, request/success/failure,
 * and we give it the details it needs to fetch data (url, headers etc)
 *
 * When it sends the fetch, it dispatches an action with our request type
 *
 * if it's successful, it disaptches an action with our success type, with the response data as the action payload
 *
 * if it fails, it dispatches an action with our failure type
 *
 */

export const init = () => ({
  [RSAA]: {
    endpoint: createEndpoint('init'),
    method: 'GET',
    types: [GET_INIT_REQUEST, GET_INIT_SUCCESS, GET_INIT_FAILURE],
  },
});

export const getPage = ({ id } = {}) => ({
  [RSAA]: {
    endpoint: createEndpoint('page', { id }),
    method: 'GET',
    types: [GET_PAGE_REQUEST, GET_PAGE_SUCCESS, GET_PAGE_FAILURE],
  },
});

export const getScreenSaver = () => ({
  [RSAA]: {
    endpoint: createEndpoint('screen-saver'),
    method: 'GET',
    types: [GET_SCREEN_SAVER_REQUEST, GET_SCREEN_SAVER_SUCCESS, GET_SCREEN_SAVER_FAILURE],
  },
});

export const setCurrentTab = index => ({
  payload: index,
  type: SET_CURRENT_TAB,
});

export const startPageAnimation = () => ({
  type: PAGE_ANIMATION_START,
});

export const finishPageAnimation = () => ({
  type: PAGE_ANIMATION_FINISH,
});
