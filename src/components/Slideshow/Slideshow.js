import React, {
  Fragment, memo, useCallback, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';
import { useInterval, usePrevious } from 'hooks';
import { TransitionEnterExit } from 'theme';
import throttle from 'lodash.throttle';
import {
  SlideshowRoot, Slide, ButtonLeft, ButtonRight,
} from './Slideshow.styles';

const Slideshow = ({
  images,
  initSlide = 0,
  interval = 0,
  timeout,
  primary,
  secondary,
  transition: transitionProp,
}) => {
  const [slide, setSlide] = useState(initSlide);

  // useCallback here ensures that we arent creating a new function on each render
  // (which would break the throttling)
  const incrementSlide = useCallback(
    throttle(() => setSlide(currSlide => currSlide + 1), timeout),
    [],
  );
  const decrementSlide = useCallback(
    throttle(() => setSlide(currSlide => currSlide - 1), timeout),
    [],
  );

  // maybe set up an interval to auto play the slider
  useInterval(incrementSlide, interval);

  // set up swipeability
  const swipeHandlers = useSwipeable({
    onSwipedLeft: incrementSlide,
    onSwipedRight: decrementSlide,
  });

  // calculate slide modulo images length
  // https://stackoverflow.com/a/47354356/7583056
  const moduloSlide = useMemo(() => ((slide % images.length) + images.length) % images.length, [
    slide,
    images.length,
  ]);

  // keep track of previous slide so we know which way we went
  const prevSlide = usePrevious(slide);

  let transition = transitionProp;
  if (transitionProp !== 'fade') {
    // different trasition depending on if we're going right or left
    transition = (prevSlide || 0) > slide ? 'to-right' : 'to-left';
  }

  return (
    <SlideshowRoot {...swipeHandlers}>
      {images.map((image, index) => {
        const { caption } = image;
        const src = image.url || image;

        return (
          <TransitionEnterExit
            key={src}
            in={moduloSlide === index}
            timeout={timeout}
            classNames="slide"
            transition={transition}
            unmountOnExit
          >
            <Slide primary={primary} secondary={secondary}>
              <img src={src} alt="slideshow slide" />

              {caption && <div className="caption">{caption}</div>}
            </Slide>
          </TransitionEnterExit>
        );
      })}

      {!interval && (
        <Fragment>
          <ButtonLeft onClick={decrementSlide} />
          <ButtonRight onClick={incrementSlide} />
        </Fragment>
      )}
    </SlideshowRoot>
  );
};

Slideshow.propTypes = {
  // array of images... image can be either just a src string or an object with {src, caption}
  images: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        caption: PropTypes.string,
      }),
    ),
    PropTypes.string.isRequired,
  ]),
  initSlide: PropTypes.number,
  interval: PropTypes.number,
  timeout: PropTypes.number,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  transition: PropTypes.oneOf(['slide', 'fade']),
};

Slideshow.defaultProps = {
  transition: 'slide',
};

export default memo(Slideshow);
