/* eslint-disable no-param-reassign */

import { v4 as uuidv4 } from 'uuid';
import { action, thunk } from 'easy-peasy';

import { IStoreUiModel } from './interfaces';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';

const storeUiModel: IStoreUiModel = {
  resourceShown: StationResourceTypeEnum.bikes,
  bikeTypeFilter: {
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
  setResourceShown: action((state, payload) => {
    state.resourceShown = payload;
  }),
  toggleResourceShown: thunk(
    (actions, payload, { getState, injections: { LocalStorageService } }) => {
      const newState =
        getState().resourceShown === StationResourceTypeEnum.bikes
          ? StationResourceTypeEnum.docks
          : StationResourceTypeEnum.bikes;

      actions.setResourceShown(newState);
      LocalStorageService().setResourceShown(newState);
    },
  ),
  setBikeType: action((state, payload) => {
    state.bikeTypeFilter = payload;
  }),
  toggleBikeType: thunk(
    (actions, payload, { getState, injections: { LocalStorageService } }) => {
      const newState = { ...getState().bikeTypeFilter };

      const bikeType = payload;
      const oppositeBikeType: BikeTypeEnum =
        payload === BikeTypeEnum.mechanical
          ? BikeTypeEnum.electrical
          : BikeTypeEnum.mechanical;

      newState[bikeType] = !newState[bikeType];

      // Avoid setting to false both types by switching to the opposite bike type.
      if (
        newState[bikeType] === false &&
        newState[oppositeBikeType] === false
      ) {
        newState[oppositeBikeType] = true;
      }

      actions.setBikeType(newState);
      LocalStorageService().setBikeTypeFilter(newState);
    },
  ),
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
