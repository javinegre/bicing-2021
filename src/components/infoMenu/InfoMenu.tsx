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
    mapZoom,
    visibleStations,
  } = storeHooks.useStoreState((state) => ({
    menuShown: state.ui.infoMenuShown,
    stationData: state.map.stationSelectedData,
    mapCenter: state.map.mapCenter,
    mapZoom: state.map.mapZoom,
    visibleStations: state.map.visibleStations,
  }));

  const { hideInfoMenu, selectStation } = storeHooks.useStoreActions(
    (actions) => ({
      hideInfoMenu: actions.ui.hideInfoMenu,
      selectStation: actions.map.selectStation,
    }),
  );

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

  return (
    <div className="InfoMenu-wrapper">
      <div
        className={`InfoMenu-backdrop ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
      />
      <aside className={`InfoMenu ${getMenuVisibilityClassName()}`}>
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
        <hr />
        {mapCenter.lat} - {mapCenter.lng}
        <hr />
        {mapZoom}
        <hr />
        {visibleStations.sort(sortByDistance).map((station) => (
          <span key={station.id}>
            <span
              onClick={(): void => {
                selectStation(station.id);
              }}
            >
              {station.id}
            </span>
            <br />
          </span>
        ))}
      </aside>
    </div>
  );
};

export default InfoMenu;
