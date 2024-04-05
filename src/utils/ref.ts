import { RefObject } from 'react';

export const checkIfRefContainsMouseEvent = (
  ref: RefObject<HTMLElement>,
  event: MouseEvent
): boolean => {
  return !!ref?.current?.contains(event.target as Node);
};
