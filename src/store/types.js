const INIT_BASE = '@@init';
const PAGE_BASE = '@@page';
const SCREEN_SAVER_BASE = '@@screen-saver';
const ANIMATION_BASE = '@@page-animation';
const TABS_BASE = '@@tabs';

const GET_INIT_REQUEST = `${INIT_BASE}/GET_INIT_REQUEST`;
const GET_INIT_SUCCESS = `${INIT_BASE}/GET_INIT_SUCCESS`;
const GET_INIT_FAILURE = `${INIT_BASE}/GET_INIT_FAILURE`;

const GET_PAGE_REQUEST = `${PAGE_BASE}/GET_PAGE_REQUEST`;
const GET_PAGE_SUCCESS = `${PAGE_BASE}/GET_PAGE_SUCCESS`;
const GET_PAGE_FAILURE = `${PAGE_BASE}/GET_PAGE_FAILURE`;

const GET_SCREEN_SAVER_REQUEST = `${SCREEN_SAVER_BASE}/GET_SCREEN_SAVER_REQUEST`;
const GET_SCREEN_SAVER_SUCCESS = `${SCREEN_SAVER_BASE}/GET_SCREEN_SAVER_SUCCESS`;
const GET_SCREEN_SAVER_FAILURE = `${SCREEN_SAVER_BASE}/GET_SCREEN_SAVER_FAILURE`;

const PAGE_ANIMATION_START = `${ANIMATION_BASE}/PAGE_ANIMATION_START`;
const PAGE_ANIMATION_FINISH = `${ANIMATION_BASE}/PAGE_ANIMATION_FINISH`;

const SET_CURRENT_TAB = `${TABS_BASE}/SET_CURRENT_TAB`;

export {
  GET_INIT_SUCCESS,
  GET_INIT_REQUEST,
  GET_INIT_FAILURE,
  GET_PAGE_SUCCESS,
  GET_PAGE_REQUEST,
  GET_PAGE_FAILURE,
  GET_SCREEN_SAVER_SUCCESS,
  GET_SCREEN_SAVER_REQUEST,
  GET_SCREEN_SAVER_FAILURE,
  PAGE_ANIMATION_START,
  PAGE_ANIMATION_FINISH,
  SET_CURRENT_TAB,
};
