/**
 * Memoized version of useIsMounted
 * https://gist.github.com/jaydenseric/a67cfb1b809b1b789daa17dfe6f83daa
 */

import { useCallback, useEffect, useRef } from 'react';

const useIsMounted = (): (() => boolean) => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return function cleanup(): void {
      isMounted.current = false;
    };
  }, []);
  const checker = useCallback((): boolean => {
    return isMounted.current;
  }, []);
  return checker;
};

export default useIsMounted;
