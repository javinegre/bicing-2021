import React from 'react';

import storeHooks from '../../store/hooks';
import { sortByDistance, splitStationListByDistance } from './helpers';

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
    hideInfoMenu,
    toggleAboutMenu,
    selectStation,
  } = storeHooks.useStoreActions((actions) => ({
    hideInfoMenu: actions.ui.hideInfoMenu,
    toggleAboutMenu: actions.ui.toggleAboutMenu,
    selectStation: actions.map.selectStation,
  }));

  const [closestStations, farthestStations] = splitStationListByDistance(
    visibleStations,
    stationData,
  );

  const hideMenu: () => void = () => hideInfoMenu();

  const getMenuVisibilityClassName: () => 'shown' | '' = () =>
    menuShown ? 'shown' : '';

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
        </div>
        <hr />
        <div className="InfoMenu-section--scrollable">
          <div>Closest Station</div>
          {closestStations.sort(sortByDistance).map((station) => (
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
          <div>Other Stations</div>
          {farthestStations.sort(sortByDistance).map((station) => (
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
