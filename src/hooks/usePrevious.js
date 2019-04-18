import { useRef, useEffect } from 'react';

/**
 * useEffect runs AFTER the render cycle that it's scoped to, and before the next one,
 * so we can use it to save a value from the previous render cycle to a ref.
 */

export default (value) => {
  const valueRef = useRef(null);
  useEffect(
    () => {
      valueRef.current = value;
    },
    [value], // Note we only need it to rerun if the value actually changed
  );

  return valueRef.current;
};
