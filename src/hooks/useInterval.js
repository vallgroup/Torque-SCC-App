import { useEffect, useRef } from 'react';

// adapted from
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export default (callback, delay) => {
  const savedCallback = useRef();
  useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback],
  );

  useEffect(
    () => {
      if (delay) {
        const id = setInterval(savedCallback.current, delay);

        return () => clearTimeout(id);
      }
    },
    [delay],
  );
};
