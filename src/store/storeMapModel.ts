/* eslint-disable no-param-reassign */

import { action, Actions, State, thunk } from 'easy-peasy';

import mapConfig from '../components/map/config';
import { IStoreMapModel, IStoreModel } from './interfaces';

const storeMapModel: IStoreMapModel = {
  mapCenter: mapConfig.mapOptions.center,
  mapZoom: mapConfig.mapOptions.zoom,
  stationSelectedID: null,
  stationSelectedData: null,
  visibleStations: [],
  setMapCenter: action((state, payload) => {
    state.mapCenter = payload;
  }),
  setMapZoom: action((state, payload) => {
    state.mapZoom = payload;
  }),
  selectStation: thunk((actions, payload, helpers) => {
    const stationListStoreState = (helpers.getStoreState() as State<IStoreModel>)
      .stationList;
    const uiStoreActions = (helpers.getStoreActions() as Actions<IStoreModel>)
      .ui;

    const stationData = stationListStoreState.stations.find(
      (station) => station.id === payload,
    );

    actions.setStationSelectedID(payload);
    actions.setStationSelectedData(stationData ?? null);

    if (stationData) {
      actions.setMapCenter({ lat: stationData.lat, lng: stationData.lng });
    }

    uiStoreActions.toggleInfoMenu(stationData !== undefined);
  }),
  setStationSelectedID: action((state, payload) => {
    state.stationSelectedID = payload;
  }),
  setStationSelectedData: action((state, payload) => {
    state.stationSelectedData = payload;
  }),
  setVisibleStations: action((state, payload) => {
    state.visibleStations = [...payload];
  }),
};

export default storeMapModel;
