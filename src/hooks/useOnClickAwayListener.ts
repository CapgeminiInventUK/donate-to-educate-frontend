import { RefObject, useEffect } from 'react';

const useOnClickAwayListener = (
  ref: RefObject<HTMLElement>,
  handler: (event?: MouseEvent) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      if (Number(event.clientX) + 7 >= window.innerWidth) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickAwayListener;
