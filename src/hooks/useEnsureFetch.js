import { useEffect } from 'react';

/**
 * Trigger a callback if a condition is met.
 *
 * We can use this to check if we have the data we need, and if not, have it automatically resend the fetch action
 */

export default (fetchAction, shouldFetch) => {
  useEffect(
    () => {
      if (shouldFetch && fetchAction) fetchAction();
    },
    [fetchAction, shouldFetch],
  );
};
