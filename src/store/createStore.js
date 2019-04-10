import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import reducer from 'store/reducer';

// @see https://github.com/zalmoxisus/redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // eslint-disable-line

export default (initialState = {}) => {
  const middleware = [thunkMiddleware, apiMiddleware];

  const enhancers = composeWithDevTools(applyMiddleware(...middleware));

  return createStore(reducer, initialState, enhancers);
};
