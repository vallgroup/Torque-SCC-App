import { useEffect } from 'react';

export default (fetchAction, shouldFetch) => {
  useEffect(
    () => {
      if (shouldFetch) fetchAction();
    },
    [fetchAction, shouldFetch],
  );
};
