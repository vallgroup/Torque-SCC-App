import React from 'react';
import ReactDOM from 'react-dom';

import './main.scss';

import App from './App';

const main = document.querySelector('main');
if (main) {
  ReactDOM.render(<App />, main);
}
