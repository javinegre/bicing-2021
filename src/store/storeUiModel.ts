/* eslint-disable no-param-reassign */

import { action, computed } from 'easy-peasy';

import mapConfig from '../components/map/config';

import { IStoreUiModel } from './interfaces';
import { IStationData } from '../interfaces';
import { StationSelectedType } from './types';
import enums from '../enums';

const storeUiModel: IStoreUiModel = {
  stationSelectedID: null,
  stationSelectedData: computed(
    [
      (state): StationSelectedType => state.stationSelectedID,
      (state, storeState): IStationData[] => storeState.stationList.stations,
    ],
    (stationSelectedID, stations) =>
      stations.find((station) => station.id === stationSelectedID) ?? null,
  ),
  resourceShown: enums.StationResourceTypeEnum.bikes,
  mapCenter: mapConfig.center,
  mapZoom: mapConfig.zoom,
  infoMenuShown: computed((state) => state.stationSelectedID !== null),
  aboutMenuShown: false,
  selectStation: action((state, payload) => {
    state.stationSelectedID = payload;
  }),
  hideInfoMenu: action((state) => {
    state.stationSelectedID = null;
  }),
  toggleAboutMenu: action((state, payload) => {
    state.aboutMenuShown = payload ?? false;
  }),
  toggleResourceShown: action((state) => {
    state.resourceShown =
      state.resourceShown === enums.StationResourceTypeEnum.bikes
        ? enums.StationResourceTypeEnum.docks
        : enums.StationResourceTypeEnum.bikes;
  }),
  setMapCenter: action((state, payload) => {
    state.mapCenter = payload;
  }),
  setMapZoom: action((state, payload) => {
    state.mapZoom = payload;
  }),
};

export default storeUiModel;
