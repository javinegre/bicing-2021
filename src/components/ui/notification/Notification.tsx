import React, { useEffect, useRef, useState } from 'react';

import storeHooks from '../../../store/hooks';

const Notification: React.FunctionComponent = () => {
  const [timespan, setTimespan] = useState<number>(0);
  const timeoutTimer = useRef<number | null>();
  const defaultTimespan = 3200;

  const notificationList = storeHooks.useStoreState(
    (state) => state.ui.notificationList,
  );

  const popNotification = storeHooks.useStoreActions(
    (actions) => actions.ui.popNotification,
  );

  const notificationShown = notificationList.length
    ? notificationList[0]
    : null;

  useEffect(() => {
    setTimespan(notificationShown?.timeout ?? defaultTimespan);

    if (timeoutTimer.current) {
      clearTimeout(timeoutTimer.current);
    }
    timeoutTimer.current = window.setTimeout(() => {
      popNotification();

      return (): void => {
        if (timeoutTimer.current) {
          clearTimeout(timeoutTimer.current);
        }
      };
    }, notificationShown?.timeout ?? defaultTimespan);
  }, [notificationShown]);

  const notificationContent = notificationShown?.content;
  const visibilityClassName =
    notificationContent === undefined ? 'translate-y-full' : 'translate-y-0';

  const onClose: () => void = () => popNotification();

  return (
    <div
      className={`absolute flex justify-between items-center bottom-0 left-0 right-0 pl-4 py-3 bg-gray-100 transform transition-transform ${visibilityClassName}`}
    >
      <div className="flex-grow-1">{notificationContent ?? ''}</div>
      <div className="flex-grow-0 flex items-center">
        {notificationList.length > 1 && (
          <div className="text-xs">(1/{notificationList.length})</div>
        )}

        <div
          className="flex-grow-0 flex items-center text-2xl px-4 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </div>
      </div>

      {notificationShown && (
        <div
          key={notificationShown.id}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600 origin-right"
          style={{
            animation: `progressBar ${timespan}ms linear forwards`,
          }}
        />
      )}
    </div>
  );
};

export default Notification;
