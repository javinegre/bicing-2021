// Based on: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useEffect, useRef } from 'react';

const useInterval: (callback: () => void, delay: number) => any = (
  callback,
  delay,
) => {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    let id: number | undefined;

    function tick(): void {
      savedCallback.current?.();
    }

    if (delay !== null) {
      id = window.setInterval(tick, delay);
    }

    return (): void => clearInterval(id);
  }, [delay]);
};

export default useInterval;
