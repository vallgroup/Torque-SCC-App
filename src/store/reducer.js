import { combineReducers } from 'redux';
import pagesReducer from 'store/pages';
import logosReducer from 'store/logos';
import screenSaverReducer from 'store/screenSaver';

export default combineReducers({
  pages: pagesReducer,
  logos: logosReducer,
  screenSaver: screenSaverReducer,
});
