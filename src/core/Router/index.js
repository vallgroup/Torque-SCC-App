import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Page, ScreenSaver } from 'components/screens';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:page" render={({ location }) => <Page uniqKey={location.pathname} />} />
    </Switch>

    <Route component={ScreenSaver} />
  </BrowserRouter>
);

export default Router;
