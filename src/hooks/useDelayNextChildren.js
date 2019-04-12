import { useState, useEffect } from 'react';
import useTimeout from 'hooks/useTimeout';

export default (children, delay) => {
  const [finalChildren, setFinalChildren] = useState(children);

  const { reset } = useTimeout(() => {
    setFinalChildren(children);
  }, delay);

  useEffect(
    () => {
      reset();
    },
    [reset, children],
  );

  return finalChildren || children || null;
};
