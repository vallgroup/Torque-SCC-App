import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'helpers/compose';
import { screenSaverSelectors } from 'store/screenSaver';
import { getScreenSaver as getScreenSaverAction } from 'store/actions';
import { useTimeout, useEnsureFetch } from 'hooks';
import Slideshow from 'components/Slideshow';
import { ScreenSaverRoot } from './ScreenSaver.styles';

const MINUTES_TO_MOUNT = 20;

const NON_IDLE_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

const mapState = state => ({
  images: screenSaverSelectors.getScreenSaverImages(state),
});

const mapActions = {
  getScreenSaver: getScreenSaverAction,
};

const ScreenSaver = ({ images, history, getScreenSaver }) => {
  const [mounted, setMounted] = useState(false);

  useEnsureFetch(getScreenSaver, !images.length);

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
    <ScreenSaverRoot
      in={mounted}
      classNames="screen-saver-fade"
      transition="fade"
      speed={1000}
      timeout={5000}
      unmountOnExit
      onExiting={handleScreenSaverExit}
      onClick={handleScreenSaverClick}
    >
      <div>
        <Slideshow images={images} interval={10000} transition="to-left" />
      </div>
    </ScreenSaverRoot>
  );
};

ScreenSaver.propTypes = {
  history: PropTypes.object.isRequired, // from withRouter HOC
  images: PropTypes.array, // from connect
  getScreenSaver: PropTypes.func.isRequired, // from connect
};

export default compose(
  withRouter,
  connect(
    mapState,
    mapActions,
  ),
  memo,
)(ScreenSaver);
