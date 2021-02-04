import React, { useEffect, useState } from 'react';

import useInterval from '../../hooks/useInterval';
import storeHooks from '../../store/hooks';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import infoBoxTimeHelpers from './helpers';

const InfoBoxTime: React.FunctionComponent = () => {
  const [timeDiff, setTimeDiff] = useState<number | null>(null);
  const defaultDelay = 10000; // 10s

  const updateTimeState = storeHooks.useStoreState(
    (state) => state.stationList.updateTime,
  );

  const { getLastUpdateTimeString } = infoBoxTimeHelpers;

  useInterval(() => {
    const now = +new Date();
    setTimeDiff(now - updateTimeState);
  }, defaultDelay);

  useEffect(() => {
    const now = +new Date();
    setTimeDiff(now - updateTimeState);
  }, [updateTimeState]);

  return (
    <div className="flex items-center">
      <Icon
        name="time-refresh"
        className="flex-shrink-0"
        size={12}
        color="#601818"
      />
      <Spacer x={4} />
      {timeDiff && (
        <span className="text-xs tracking-tighter whitespace-nowrap">
          {getLastUpdateTimeString(timeDiff)}
        </span>
      )}
    </div>
  );
};

export default InfoBoxTime;
