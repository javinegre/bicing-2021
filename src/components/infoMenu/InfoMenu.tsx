import React from 'react';

import StationStatusBar from '../../stationStatusBar/stationStatusBar';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import { sortByDistance, splitStationListByDistance } from './helpers';
import appConfig from '../../config';

import './InfoMenu.css';

const InfoMenu: React.FunctionComponent = () => {
  const { menuShown, stationData, visibleStations } = storeHooks.useStoreState(
    (state) => ({
      menuShown: state.ui.infoMenuShown,
      stationData: state.map.stationSelectedData,
      visibleStations: state.map.visibleStations,
    }),
  );

  const {
    toggleInfoMenu,
    toggleAboutMenu,
    selectStation,
  } = storeHooks.useStoreActions((actions) => ({
    toggleInfoMenu: actions.ui.toggleInfoMenu,
    toggleAboutMenu: actions.ui.toggleAboutMenu,
    selectStation: actions.map.selectStation,
  }));

  const [closestStations, farthestStations] = splitStationListByDistance(
    visibleStations,
    stationData,
  );

  const hideMenu: () => void = () => toggleInfoMenu(false);

  const getMenuVisibilityClassName: () => 'shown' | '' = () =>
    menuShown ? 'shown' : '';

  const showAboutMenu: () => void = () => toggleAboutMenu(true);

  const iconColor = appConfig.infoMenuIconColor;

  return (
    <div className="InfoMenu-wrapper order-1">
      <div
        className={`InfoMenu-backdrop ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
      />
      <aside className={`InfoMenu ${getMenuVisibilityClassName()}`}>
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
        <div className="InfoMenu-section--scrollable flex-grow-1 px-4 py-3">
          <div className="pb-4 font-light">Closest Station</div>
          {closestStations.sort(sortByDistance).map((station) => (
            <div
              key={station.id}
              className="pb-6"
              onClick={(): void => {
                selectStation(station.id);
              }}
            >
              <StationStatusBar stationData={station} height={1} />
              <div className="text-xs font-extralight">{station.name}</div>
            </div>
          ))}
          <div className="pb-4 font-light">Other Stations</div>
          {farthestStations.sort(sortByDistance).map((station) => (
            <div
              key={station.id}
              className="pb-6"
              onClick={(): void => {
                selectStation(station.id);
              }}
            >
              <StationStatusBar stationData={station} height={1} />
              <div className="text-xs font-extralight">{station.name}</div>
            </div>
          ))}
        </div>
        <div
          className="flex-grow-0 flex items-center px-4 py-3"
          onClick={showAboutMenu}
        >
          <Icon name="info" color={iconColor} />
          <Spacer x={4} />
          Info about this app
        </div>
      </aside>
    </div>
  );
};

export default InfoMenu;
