import { useRef, useEffect } from 'react';

export default (value) => {
  const valueRef = useRef(null);
  useEffect(
    () => {
      valueRef.current = value;
    },
    [value],
  );

  return valueRef.current;
};
