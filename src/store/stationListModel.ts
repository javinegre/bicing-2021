/* eslint-disable no-param-reassign */

import { action, thunk } from 'easy-peasy';

import StationService from '../services/stationService';
import { IStoreStationListModel } from './interfaces';

const storeStationListModel: IStoreStationListModel = {
  updateTime: -Infinity,
  stations: [],
  fetched: action((state, payload) => {
    state.updateTime = payload.updateTime;
    state.stations = [...payload.stations];
  }),
  fetch: thunk(async (actions) => {
    const data = await StationService().getList();
    if (data) {
      actions.fetched(data);
    }
  }),
};

export default storeStationListModel;
