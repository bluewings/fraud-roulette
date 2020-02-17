import { useCallback, useRef } from 'react';

function useHandle(callback?: Function) {
  const handle = useRef<Function>();
  handle.current = callback;
  return useCallback((e: any, ...args: any[]) => {
    if (typeof handle.current === 'function') {
      return handle.current(e, ...args);
    }
  }, []);
}

export default useHandle;
