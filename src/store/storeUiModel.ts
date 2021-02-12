/* eslint-disable no-param-reassign */

import { v4 as uuidv4 } from 'uuid';
import { action } from 'easy-peasy';

import LocalStorageService from '../services/localStorageService';
import { IStoreUiModel } from './interfaces';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';

const storeUiModel: IStoreUiModel = {
  resourceShown:
    LocalStorageService().getResourceShown() ?? StationResourceTypeEnum.bikes,
  bikeTypeFilter: LocalStorageService().getBikeTypeFilter() ?? {
    [BikeTypeEnum.mechanical]: true,
    [BikeTypeEnum.electrical]: true,
  },
  infoMenuShown: false,
  aboutMenuShown: false,
  notificationList: [],
  toggleInfoMenu: action((state, payload) => {
    state.infoMenuShown = payload ?? !state.infoMenuShown;
  }),
  toggleAboutMenu: action((state, payload) => {
    state.aboutMenuShown = payload ?? !state.aboutMenuShown;
  }),
  toggleResourceShown: action((state) => {
    const newState =
      state.resourceShown === StationResourceTypeEnum.bikes
        ? StationResourceTypeEnum.docks
        : StationResourceTypeEnum.bikes;
    state.resourceShown = newState;
    LocalStorageService().setResourceShown(newState);
  }),
  toggleBikeType: action((state, payload) => {
    const newState = { ...state.bikeTypeFilter };

    const bikeType = payload;
    const oppositeBikeType: BikeTypeEnum =
      payload === BikeTypeEnum.mechanical
        ? BikeTypeEnum.electrical
        : BikeTypeEnum.mechanical;

    newState[bikeType] = !newState[bikeType];

    // Avoid setting to false both types by switching to the opposite bike type.
    if (newState[bikeType] === false && newState[oppositeBikeType] === false) {
      newState[oppositeBikeType] = true;
    }

    state.bikeTypeFilter = newState;
    LocalStorageService().setBikeTypeFilter(newState);
  }),
  pushNotification: action((state, payload) => {
    payload.id = uuidv4();
    state.notificationList = [...state.notificationList, payload];
  }),
  popNotification: action((state) => {
    const notificationListNewState = [...state.notificationList];
    notificationListNewState.shift();
    state.notificationList = notificationListNewState;
  }),
};

export default storeUiModel;
