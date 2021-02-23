/* eslint-disable no-param-reassign */

import { action, thunk } from 'easy-peasy';

import mapConfig from '../components/map/config';
import { IStoreMapModel } from './interfaces';

const storeMapModel: IStoreMapModel = {
  mapCenter: mapConfig.mapOptions.center,
  mapZoom: mapConfig.mapOptions.zoom,
  userLocation: null,
  stationSelectedID: null,
  stationSelectedData: null,
  visibleStations: [],
  updateMapCenterState: action((state, payload) => {
    state.mapCenter = payload;
  }),
  setMapCenter: thunk(
    (actions, payload, { injections: { LocalStorageService } }) => {
      actions.updateMapCenterState(payload);
      LocalStorageService().setPosition('mapCenter', payload);
    },
  ),
  updateMapZoomState: action((state, payload) => {
    state.mapZoom = payload;
  }),
  setMapZoom: thunk(
    (actions, payload, { injections: { LocalStorageService } }) => {
      actions.updateMapZoomState(payload);
      LocalStorageService().setMapZoom(payload);
    },
  ),
  updateUserLocationState: action((state, payload) => {
    state.userLocation = payload;
  }),
  setUserLocation: thunk(
    (actions, payload, { injections: { LocalStorageService } }) => {
      actions.updateUserLocationState(payload);
      LocalStorageService().setUserLocation(payload);
    },
  ),
  selectStation: thunk((actions, payload, helpers) => {
    const stationListStoreState = helpers.getStoreState().stationList;
    const uiStoreActions = helpers.getStoreActions().ui;

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
