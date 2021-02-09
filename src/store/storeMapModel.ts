/* eslint-disable no-param-reassign */

import { action, Actions, State, thunk } from 'easy-peasy';

import LocalStorageService from '../services/localStorageService';
import mapConfig from '../components/map/config';
import { IStoreMapModel, IStoreModel } from './interfaces';

const storeMapModel: IStoreMapModel = {
  mapCenter:
    LocalStorageService().getPosition('mapCenter') ??
    mapConfig.mapOptions.center,
  mapZoom: LocalStorageService().getMapZoom() ?? mapConfig.mapOptions.zoom,
  userLocation: LocalStorageService().getUserLocation(),
  stationSelectedID: null,
  stationSelectedData: null,
  visibleStations: [],
  setMapCenter: action((state, payload) => {
    state.mapCenter = payload;
    LocalStorageService().setPosition('mapCenter', payload);
  }),
  setMapZoom: action((state, payload) => {
    state.mapZoom = payload;
    LocalStorageService().setMapZoom(payload);
  }),
  setUserLocation: action((state, payload) => {
    state.userLocation = payload;
    LocalStorageService().setUserLocation(payload);
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
