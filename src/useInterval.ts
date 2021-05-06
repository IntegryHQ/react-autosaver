/**
 * Dan Abramov's useInterval hook
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */

import React from 'react';

const { useEffect, useRef } = React;

type IntervalFunction = () => unknown | void;

export function useInterval(
  callback: IntervalFunction,
  delay: number | null,
): void {
  const savedCallback = useRef<IntervalFunction | null>(null);

  useEffect(() => {
    if (delay === null) return;
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
