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
  PAGE_ANIMATION_START,
  PAGE_ANIMATION_FINISH,
} from 'store/types';

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

export const startPageAnimation = () => ({
  type: PAGE_ANIMATION_START,
});

export const finishPageAnimation = () => ({
  type: PAGE_ANIMATION_FINISH,
});
