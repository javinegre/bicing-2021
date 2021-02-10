import React from 'react';

import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import StationStatusBar from '../stationStatusBar/stationStatusBar';
import infoMenuDetailsHelpers from './helpers';
import storeHooks from '../../store/hooks';
import appConfig from '../../config';

const InfoMenuDetails: React.FunctionComponent = () => {
  const { stationData, resourceShown } = storeHooks.useStoreState((state) => ({
    stationData: state.map.stationSelectedData,
    resourceShown: state.ui.resourceShown,
  }));

  const iconColor = appConfig.infoMenuIconColor;

  const isOperating = stationData?.status === 1;

  return (
    <>
      {stationData && (
        <div className="flex-grow-0 flex flex-col px-4 pt-3 pb-5">
          <div className="relative">
            <div className={!isOperating ? 'opacity-10' : ''}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="text-3xl font-bold">
                      {stationData.bikes}
                    </div>
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
            </div>

            {stationData?.status === 0 && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="bg-yellow-200 text-black text-sm font-bold px-2 py-1 rounded">
                  Station not operating
                </span>
              </div>
            )}
          </div>

          <div>{stationData.name}</div>

          <Spacer y={12} />

          <div className="flex flex-wrap">
            <a
              className="flex rounded-full items-center px-1.5 py-1 bg-infoMenuBg-light hover:bg-infoMenuBg-dark text-gray-400 text-sm font-light"
              href={infoMenuDetailsHelpers.getDirectionsUrl(
                stationData,
                resourceShown,
              )}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="route" color="#808080" />
              <Spacer x={2} />
              <span className="whitespace-nowrap">Get directions</span>
            </a>

            <Spacer x={6} />

            <a
              className="flex rounded-full items-center px-1.5 p-1 bg-infoMenuBg-light hover:bg-infoMenuBg-dark text-gray-400 text-sm font-light"
              href={infoMenuDetailsHelpers.getStreetViewUrl(stationData)}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="street-view" color="#808080" />
              <Spacer x={2} />
              <span className="whitespace-nowrap">Street View</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoMenuDetails;
