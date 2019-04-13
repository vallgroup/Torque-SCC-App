import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Page, ScreenSaver } from 'components/screens';
import DelayedSwitch from './DelayedSwitch';

const Router = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <DelayedSwitch location={location}>
          <Route exact path="/" component={Home} />
          <Route path="/:page" component={Page} />
        </DelayedSwitch>
      )}
    />

    <Route component={ScreenSaver} />
  </BrowserRouter>
);

export default Router;
