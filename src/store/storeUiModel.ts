/* eslint-disable no-param-reassign */

import { action } from 'easy-peasy';

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
  toggleInfoMenu: action((state, payload) => {
    state.infoMenuShown = payload ?? !state.infoMenuShown;
  }),
  toggleAboutMenu: action((state, payload) => {
    state.aboutMenuShown = payload ?? !state.aboutMenuShown;
  }),
  toggleResourceShown: action((state) => {
    state.resourceShown =
      state.resourceShown === StationResourceTypeEnum.bikes
        ? StationResourceTypeEnum.docks
        : StationResourceTypeEnum.bikes;
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
  }),
};

export default storeUiModel;
