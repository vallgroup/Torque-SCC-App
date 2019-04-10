import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';
import { Router } from 'core';
import theme from 'theme';
import { init } from 'store/actions';

const store = createStore();
store.dispatch(init()); // dispatch initial data request when app first boots up

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);

export default App;
