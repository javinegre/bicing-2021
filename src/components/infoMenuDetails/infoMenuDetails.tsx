import React from 'react';

import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import StationStatusBar from '../stationStatusBar/stationStatusBar';
import InfoMenuNavigation from '../infoMenuNavigation/infoMenuNavigation';
import storeHooks from '../../store/hooks';
import appConfig from '../../config';

const InfoMenuDetails: React.FunctionComponent = () => {
  const stationData = storeHooks.useStoreState(
    (state) => state.map.stationSelectedData,
  );

  const iconColor = appConfig.infoMenuIconColor;

  const isOperating = stationData?.status === 1;

  return (
    <>
      {stationData && (
        <div className="flex-grow-0 flex-shrink-0 flex-col px-4 py-3">
          <div className="relative">
            <div className={!isOperating ? 'opacity-10' : ''}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="text-3xl font-bold">
                      {stationData.bikes}
                    </div>
                    <Spacer x={4} />
                    <Icon name="bike" color={iconColor} size={24} />
                  </div>

                  <Spacer x={8} />

                  <div className="flex items-center">
                    <div>{stationData.mechanical}</div>
                    <Spacer x={3} />
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
                  <Spacer x={1} />
                  <div className="text-3xl font-bold">{stationData.docks}</div>
                </div>
              </div>

              <StationStatusBar
                stationData={stationData}
                className="mt-0.5 mb-1.5"
              />
            </div>

            {stationData?.status === 0 && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="bg-yellow-200 text-black text-sm font-bold px-2 py-1 rounded">
                  Station not operating
                </span>
              </div>
            )}
          </div>

          <div className="mb-3">{stationData.name}</div>

          <InfoMenuNavigation />
        </div>
      )}
    </>
  );
};

export default InfoMenuDetails;
