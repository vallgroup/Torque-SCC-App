import { combineReducers } from 'redux';
import pagesReducer from 'store/pages';
import logosReducer from 'store/logos';

export default combineReducers({
  pages: pagesReducer,
  logos: logosReducer,
});
