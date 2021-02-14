import React, { useEffect, useState } from 'react';

import useInterval from '../../hooks/useInterval';
import storeHooks from '../../store/hooks';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import infoBoxTimeHelpers from './helpers';
import { AppFunctionComponent } from '../../types';

const InfoBoxTime: AppFunctionComponent = () => {
  const [timeDiff, setTimeDiff] = useState<number | null>(null);
  const defaultIntervalDelay = 10000; // 10s
  const outdatedThreshold = 300000; // 5min

  const { updateTimeState, isDataLoading } = storeHooks.useStoreState(
    (state) => ({
      updateTimeState: state.stationList.updateTime,
      isDataLoading: state.stationList.isDataLoading,
    }),
  );

  const { getLastUpdateTimeString } = infoBoxTimeHelpers;

  const updateTimeDiff: () => void = () => {
    const now = +new Date();
    setTimeDiff(updateTimeState ? now - updateTimeState : null);
  };

  useInterval(updateTimeDiff, defaultIntervalDelay);

  useEffect(updateTimeDiff, [isDataLoading, updateTimeState]);

  const isOutdated = timeDiff !== null && timeDiff > outdatedThreshold;

  return (
    <>
      {updateTimeState !== null && (
        <div
          className={`flex items-center transition-opacity delay-200 duration-300 ${
            isDataLoading ? 'opacity-20' : ''
          }`}
        >
          <Icon
            name={isOutdated ? 'warning' : 'time-refresh'}
            className="flex-shrink-0"
            size={isOutdated ? 14 : 12}
            color={isOutdated ? 'gold' : '#601818'}
          />

          <Spacer x={4} />

          {timeDiff && (
            <span className="text-xs tracking-tighter whitespace-nowrap">
              {getLastUpdateTimeString(timeDiff)}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default InfoBoxTime;
