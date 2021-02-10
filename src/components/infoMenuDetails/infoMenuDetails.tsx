import React from 'react';

import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import StationStatusBar from '../stationStatusBar/stationStatusBar';
import storeHooks from '../../store/hooks';
import appConfig from '../../config';

const InfoMenuDetails: React.FunctionComponent = () => {
  const stationData = storeHooks.useStoreState(
    (state) => state.map.stationSelectedData,
  );

  const iconColor = appConfig.infoMenuIconColor;

  return (
    <>
      {stationData && (
        <div className="flex-grow-0 px-4 pt-3 pb-5">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="text-3xl font-bold">{stationData.bikes}</div>
                <Icon name="bike" color={iconColor} />
              </div>

              <Spacer x={8} />

              <div className="flex items-center">
                <div>{stationData.mechanical}</div>
                <Icon name="gears" color={iconColor} size={12} />
              </div>

              <Spacer x={6} />

              <div className="flex items-center">
                <div>{stationData.electrical}</div>
                <Icon name="bolt" color={iconColor} size={12} />
              </div>
            </div>

            <div className="flex items-center">
              <Icon name="parking" color={iconColor} />
              <div className="text-3xl font-bold">{stationData.docks}</div>
            </div>
          </div>

          <StationStatusBar
            stationData={stationData}
            className="mt-0.5 mb-1.5"
          />

          <div>{stationData.name}</div>
        </div>
      )}
    </>
  );
};

export default InfoMenuDetails;
