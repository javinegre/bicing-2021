// Based on https://stackoverflow.com/questions/48048957/react-long-press-event

import React, { useCallback, useRef, useState } from 'react';

import { ILongPressEvents, ILongPressHookOptions } from './interfaces';

const useLongPress: <T>(
  onLongPress: (
    event: React.MouseEvent<T, MouseEvent> | React.TouchEvent<T>,
  ) => void,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  { shouldPreventDefault, delay }?: ILongPressHookOptions,
) => ILongPressEvents<T> = (
  onLongPress,
  onClick,
  { shouldPreventDefault = true, delay = 300 } = {},
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>();
  const target = useRef<EventTarget | undefined>();

  const start = useCallback(
    (event: Parameters<typeof onLongPress>[0]) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (shouldTriggerClick && !longPressTriggered) {
        onClick(event);
      }
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered],
  );

  return {
    onMouseDown: (event): void => start(event),
    onTouchStart: (event): void => start(event),
    onMouseUp: (event): void => clear(event),
    onMouseLeave: (event): void => clear(event, false),
    onTouchEnd: (event): void => clear(event),
  };
};

const isTouchEvent: (event: Event) => boolean = (event) => 'touches' in event;

const preventDefault: (event: Event) => void = (event) => {
  if (!isTouchEvent(event)) return;

  if ((event as TouchEvent).touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
