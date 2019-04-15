import React, { memo, useEffect } from 'react';
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
  const render = (
    <Switch location={location} key={location.key}>
      {children}
    </Switch>
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
