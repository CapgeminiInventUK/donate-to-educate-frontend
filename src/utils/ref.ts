import { RefObject } from 'react';

export const checkIfRefContainsMouseEvent = (
  ref: RefObject<HTMLInputElement>,
  event: MouseEvent
): boolean => {
  return ref.current !== null && ref.current.contains(event.target as Node);
};
