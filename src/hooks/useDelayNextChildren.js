import { useState, useEffect } from 'react';
import useTimeout from 'hooks/useTimeout';

/**
 * Prevents rendering of children for a specified delay time.
 *
 * Make sure children have a 'key' prop, like when we map an array to JSX elements
 *
 * eg
 *
 * to delay rendering updated children for 1 second
 *
 * const render = (
 *  <ChildComponent key={someUniqueKey} />
 * )
 * const {currentChildren, timeoutIsRunning} = useDelayNextChildren(render, 1000)
 *
 * return currentChildren
 */

export default (children, delay) => {
  if (typeof children.key === 'undefined') console.warn('Children must have a key prop to be passed to useDelayNextChildren');

  // store the children to actually be rendered
  const [finalChildren, setFinalChildren] = useState(children);

  const currentChildren = finalChildren || null;
  const nextChildren = children.key === currentChildren.key ? null : children;
  const timeoutIsRunning = !!nextChildren;

  // set the new children as the final children after a specified timeout
  const { reset } = useTimeout(
    () => {
      setFinalChildren(children);
    },
    delay,
    timeoutIsRunning,
  );

  // if children change during the timeout, restart it
  useEffect(
    () => {
      reset();
    },
    [reset, children.key],
  );

  return {
    currentChildren,
    timeoutIsRunning,
  };
};
