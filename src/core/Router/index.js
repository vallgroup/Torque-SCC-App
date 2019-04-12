import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Page, ScreenSaver } from 'components/screens';
import { useDelayNextChildren } from 'hooks';

const Router = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <Delayed>
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route path="/:page" render={({ location }) => <Page uniqKey={location.pathname} />} />
          </Switch>
        </Delayed>
      )}
    />

    <Route component={ScreenSaver} />
  </BrowserRouter>
);

const Delayed = ({ children }) => useDelayNextChildren(children, 1000);

export default Router;
