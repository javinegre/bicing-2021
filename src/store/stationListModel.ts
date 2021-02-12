/* eslint-disable no-param-reassign */

import { action, thunk } from 'easy-peasy';

import StationService from '../services/stationService';
import { IStoreStationListModel } from './interfaces';

const storeStationListModel: IStoreStationListModel = {
  updateTime: null,
  stations: [],
  isDataLoading: false,
  setDataLoading: action((state, payload) => {
    state.isDataLoading = payload;
  }),
  fetched: action((state, payload) => {
    state.updateTime = payload.updateTime;
    state.stations = [...payload.stations];
  }),
  fetch: thunk(async (actions) => {
    actions.setDataLoading(true);
    const data = await StationService().getList();
    actions.setDataLoading(false);
    if (data) {
      actions.fetched(data);
    }
  }),
};

export default storeStationListModel;
