import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Page, ScreenSaver } from 'components/screens';
import DelayedSwitch from './DelayedSwitch';

// largely inspired by this article:
//
// https://medium.com/onfido-tech/animations-with-react-router-8e97222e25e1
//
// By nesting the entire switch inside a Route,
// we can delay it by delaying the passing of the 'location' prop.
//
// Then, instead of animating the route components directly,
// we use redux to let any component connect and animate itself in response to a route change

const Router = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <DelayedSwitch location={location}>
          <Route exact path="/" component={Home} />
          <Route
            path="/:pageSlug"
            render={({ match }) => <Page pageSlug={match?.params?.pageSlug} />} // eslint-disable-line
          />
        </DelayedSwitch>
      )}
    />

    <Route component={ScreenSaver} />
  </BrowserRouter>
);

export default Router;
