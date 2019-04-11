import React, { memo, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'helpers/compose';
import { useTimeout } from 'hooks';
import {
  ScreenSaverWrapper,
  ScreenSaverInner,
  transitionGroupClassName,
  transitionGroupTimeout,
} from './ScreenSaver.styles';

const MINUTES_TO_MOUNT = 20;

const NON_IDLE_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

const ScreenSaver = ({ history }) => {
  const [mounted, setMounted] = useState(false);

  // create a timeout for showing the screen saver, with a function to reset it to 0
  const { reset } = useTimeout(
    () => {
      setMounted(true);
    },
    MINUTES_TO_MOUNT * 60 * 1000,
    !mounted, // with this, the timeout will clean itself up and start again when we next un mount the screen saver
  );

  // make sure the event listeners always have our latest reset function
  useEffect(
    () => {
      window.addEventListener('load', reset, true);
      NON_IDLE_EVENTS.forEach((event) => {
        document.addEventListener(event, reset, true);
      });

      return () => {
        window.removeEventListener('load', reset, true);
        NON_IDLE_EVENTS.forEach((event) => {
          document.removeEventListener(event, reset, true);
        });
      };
    },
    [reset],
  );

  const handleScreenSaverClick = () => setMounted(false);

  const handleScreenSaverExit = () => history.push('/');

  return (
    <ScreenSaverWrapper
      in={mounted}
      timeout={transitionGroupTimeout}
      classNames={transitionGroupClassName}
      unmountOnExit
      onExiting={handleScreenSaverExit}
      onClick={handleScreenSaverClick}
    >
      <ScreenSaverInner />
    </ScreenSaverWrapper>
  );
};

export default compose(
  withRouter,
  memo,
)(ScreenSaver);
