import React, { memo, useRef, useState, useEffect } from 'react';
import { TransitionEnterExit } from 'theme';

const ImageOnLoaded = ({ className, ...imageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef(null);

  // check the image ref directly for the 'complete' property, in case it's already loaded
  useEffect(() => {
    if (!loaded && imageRef?.current?.complete) setLoaded(true);
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
      timeout={600}
    >
      <img ref={imageRef} {...imageProps} />
    </TransitionEnterExit>
  );
};

export default memo(ImageOnLoaded);
