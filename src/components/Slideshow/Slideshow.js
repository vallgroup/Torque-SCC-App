import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useInterval } from 'hooks';
import {
  SlideshowRoot, Slide, slideClassName, slideTimeout,
} from './Slideshow.styles';

const Slideshow = ({ images, interval = 0, transition = 'fade' }) => {
  const [slide, setSlide] = useState(0);

  const incrementSlide = useCallback(
    () => {
      setSlide(prevSlide => (prevSlide + 1) % images.length);
    },
    [images.length],
  );

  const decrementSlide = useCallback(
    () => {
      setSlide(prevSlide => (prevSlide - 1) % images.length);
    },
    [images.length],
  );

  useInterval(incrementSlide, interval);

  return (
    <SlideshowRoot>
      {images.map((image, index) => (
        <Slide
          in={slide === index}
          timeout={slideTimeout}
          classNames={`${slideClassName}-${transition}`}
          unmountOnExit
          transition={transition}
        >
          <img src={image} alt="slideshow slide" />
        </Slide>
      ))}
    </SlideshowRoot>
  );
};

Slideshow.propTypes = {
  images: PropTypes.array.isRequired,
  interval: PropTypes.number,
  transition: PropTypes.oneOf(['fade', 'slide']),
};

export default memo(Slideshow);
