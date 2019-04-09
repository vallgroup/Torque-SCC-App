import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'core';
import theme from 'theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>
);

export default App;
