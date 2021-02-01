import React from 'react';

import storeHooks from '../../store/hooks';

import './InfoMenu.css';
import { IStationData } from '../../interfaces';
import { IMapsCoordinates } from '../map/interfaces';

const InfoMenu: React.FunctionComponent = () => {
  const {
    menuShown,
    stationData,
    mapCenter,
    visibleStations,
  } = storeHooks.useStoreState((state) => ({
    menuShown: state.ui.infoMenuShown,
    stationData: state.map.stationSelectedData,
    mapCenter: state.map.mapCenter,
    visibleStations: state.map.visibleStations,
  }));

  const {
    hideInfoMenu,
    toggleAboutMenu,
    selectStation,
  } = storeHooks.useStoreActions((actions) => ({
    hideInfoMenu: actions.ui.hideInfoMenu,
    toggleAboutMenu: actions.ui.toggleAboutMenu,
    selectStation: actions.map.selectStation,
  }));

  const hideMenu: () => void = () => hideInfoMenu();

  const getMenuVisibilityClassName: () => 'shown' | '' = () =>
    menuShown ? 'shown' : '';

  const getStationDistance: (
    stationData: IStationData,
    center: IMapsCoordinates,
  ) => number = (station, center) =>
    Math.sqrt(
      (center.lat - station.lat) ** 2 + (center.lng - station.lng) ** 2,
    );

  const sortByDistance: (
    stationA: IStationData,
    stationB: IStationData,
  ) => number = (stationA, stationB) =>
    getStationDistance(stationA, mapCenter) -
    getStationDistance(stationB, mapCenter);

  const showAboutMenu: () => void = () => toggleAboutMenu(true);

  return (
    <div className="InfoMenu-wrapper">
      <div
        className={`InfoMenu-backdrop ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
      />
      <aside className={`InfoMenu ${getMenuVisibilityClassName()}`}>
        <div className="InfoMenu-section--sticky">
          {stationData && (
            <div>
              {stationData.name}
              <br />
              {stationData.bikes}: ({stationData.mechanical} +{' '}
              {stationData.electrical})
              <br />
              {stationData.docks}
            </div>
          )}
          {!stationData && <div>No station selected</div>}
        </div>
        <hr />
        <div className="InfoMenu-section--scrollable">
          {visibleStations.sort(sortByDistance).map((station) => (
            <span key={station.id}>
              <span
                onClick={(): void => {
                  selectStation(station.id);
                }}
              >
                {station.name}
              </span>
              <br />
            </span>
          ))}
        </div>
        <div className="InfoMenu-section--sticky" onClick={showAboutMenu}>
          <span role="img" aria-label="Info">
            ℹ️
          </span>
          Info about this app
        </div>
      </aside>
    </div>
  );
};

export default InfoMenu;
