import React, { memo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TransitionEnterExit } from 'theme';

// Keep an image hidden until it's been successfully dowloaded,
// then transition it in

const ImageOnLoaded = ({ className, ...imageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(null);

  // check the image ref directly for the 'complete' property, in case it's already loaded
  useEffect(() => {
    if (!loaded && imageRef?.current?.complete) setLoaded(true); // eslint-disable-line
  });

  // if not yet loaded, attach an event listener for when the image loading completes
  useEffect(() => {
    if (!loaded) {
      const image = imageRef?.current;
      if (!image) return;

      const handleLoaded = () => setLoaded(true);

      image.addEventListener('load', handleLoaded);
      return () => image.removeEventListener('load', handleLoaded);
    }
  });

  return (
    <TransitionEnterExit
      in={loaded}
      className={className}
      classNames="image-on-loaded"
      transition="fade"
      timeout={500}
    >
      <Image ref={imageRef} {...imageProps} />
    </TransitionEnterExit>
  );
};

const Image = styled.img`
  opacity: 0;
`;

export default memo(ImageOnLoaded);
