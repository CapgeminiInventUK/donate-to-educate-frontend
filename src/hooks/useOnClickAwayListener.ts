import { type RefObject, useEffect } from 'react';
import { checkIfRefContainsMouseEvent } from '../utils/ref';

const useOnClickAwayListener = (
  ref: RefObject<HTMLElement>,
  handler: (event?: MouseEvent) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (checkIfRefContainsMouseEvent(ref, event)) {
        return;
      }
      if (Number(event.clientX) + 7 >= window.innerWidth) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return (): void => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickAwayListener;
