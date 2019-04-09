import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme, { H1 } from 'theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <H1>Hello World!</H1>
  </ThemeProvider>
);

export default App;
