import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'helpers/compose';
import { screenSaverSelectors } from 'store/screenSaver';
import { logoSelectors } from 'store/logos';
import { getScreenSaver as getScreenSaverAction } from 'store/actions';
import { useTimeout, useEnsureFetch } from 'hooks';
import Slideshow from 'components/Slideshow';
import LogoCorner from 'components/LogoCorner';
import { TransitionEnterExit } from 'theme';
import { ScreenSaverRoot } from './ScreenSaver.styles';

const MINUTES_TO_MOUNT = 0.5;

const NON_IDLE_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

const mapState = state => ({
  glenstarText: logoSelectors.getGlenstarText(state),
  images: screenSaverSelectors.getScreenSaverImages(state),
});

const mapActions = {
  getScreenSaver: getScreenSaverAction,
};

const ScreenSaver = ({
  images, history, getScreenSaver, glenstarText,
}) => {
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

  const handleEnter = () => setTimeout(() => history.push('/'), 1000);

  return (
    <TransitionEnterExit
      in={mounted}
      classNames="screen-saver"
      transition="fade"
      timeout={1000}
      timeoutOut={500}
      unmountOnExit
      onEnter={handleEnter}
      onClick={handleScreenSaverClick}
    >
      <ScreenSaverRoot>
        <Slideshow images={images} interval={10000} timeout={500} transition="fade" />

        {glenstarText && <img src={glenstarText} className="screen_saver_logo" alt="logo" />}
        <LogoCorner />
      </ScreenSaverRoot>
    </TransitionEnterExit>
  );
};

ScreenSaver.propTypes = {
  history: PropTypes.object.isRequired, // from withRouter HOC
  images: PropTypes.array, // from connect
  getScreenSaver: PropTypes.func.isRequired, // from connect
  glenstarText: PropTypes.string, // from connect
};

export default compose(
  withRouter,
  connect(
    mapState,
    mapActions,
  ),
  memo,
)(ScreenSaver);
