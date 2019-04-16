import React, { memo, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import compose from 'helpers/compose';
import { Switch } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { useDelayNextChildren } from 'hooks';
import { startPageAnimation, finishPageAnimation } from 'store/actions';

const mapActions = {
  startAnimation: startPageAnimation,
  finishAnimation: finishPageAnimation,
};

const DelayedSwitch = ({
  theme, location, children, startAnimation, finishAnimation,
}) => {
  const render = useMemo(
    () => (
      <Switch location={location} key={location.key}>
        {children}
      </Switch>
    ),
    [location.pathname], // eslint-disable-line
    // Note:
    // technically here we're lying to the useMemo dependencies,
    // but it's a special case where do actually want to block updates
    // unless the pathname itself has changed.
    //
    // This is so if you click to navigate to the same page youre already on,
    // we wont see the route animation, even though location.key has changed
  );

  const { currentChildren, timeoutIsRunning } = useDelayNextChildren(
    render,
    theme.vars.SWITCH_DELAY,
  );

  useEffect(
    () => {
      if (timeoutIsRunning) {
        startAnimation();
      } else {
        finishAnimation();
      }
    },
    [timeoutIsRunning, startAnimation, finishAnimation],
  );

  return currentChildren;
};

export default compose(
  connect(
    null,
    mapActions,
  ),
  withTheme,
  memo,
)(DelayedSwitch);
