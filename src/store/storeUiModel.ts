/* eslint-disable no-param-reassign */

import { action, computed } from 'easy-peasy';

import { IStoreUiModel } from './interfaces';
import { IStationData } from '../interfaces';
import { StationSelectedType } from './types';

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
};

export default storeUiModel;
