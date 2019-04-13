import { useState, useEffect } from 'react';
import useTimeout from 'hooks/useTimeout';

export default (children, delay) => {
  const [finalChildren, setFinalChildren] = useState(children);

  if (typeof children.key === 'undefined') console.warn('Children must have a key prop to be passed to useDelayNextChildren');

  const currentChildren = finalChildren || null;
  const nextChildren = children.key === currentChildren.key ? null : children;
  const timeoutIsRunning = !!nextChildren;

  const { reset } = useTimeout(
    () => {
      setFinalChildren(children);
    },
    delay,
    timeoutIsRunning,
  );

  useEffect(
    () => {
      reset();
    },
    [reset, children.key],
  );

  return {
    currentChildren,
    nextChildren,
    timeoutIsRunning,
  };
};
