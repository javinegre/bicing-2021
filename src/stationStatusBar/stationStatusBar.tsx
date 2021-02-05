import React from 'react';

import { IStationStatusBarProps } from './interfaces';
import appConfig from '../config';

const StationStatusBar: React.FunctionComponent<IStationStatusBarProps> = (
  props,
) => {
  const { stationData, height, className } = props;

  const defaultHeight = 4;

  const total =
    stationData.mechanical + stationData.electrical + stationData.docks;

  const getBarWidth: (num: number) => string = (num) =>
    `${(num / total) * 100}%`;

  return (
    <div
      className={`flex ${className}`}
      style={{ height: height ?? defaultHeight }}
    >
      <div
        className="flex-grow"
        style={{
          width: getBarWidth(stationData.mechanical),
          backgroundColor: appConfig.stationStatusBarColor.mechanical,
        }}
      />
      <div
        className="flex-grow"
        style={{
          width: getBarWidth(stationData.electrical),
          backgroundColor: appConfig.stationStatusBarColor.electrical,
        }}
      />
      <div
        className="flex-grow"
        style={{
          width: getBarWidth(stationData.docks),
          backgroundColor: appConfig.stationStatusBarColor.docks,
        }}
      />
    </div>
  );
};

export default StationStatusBar;
