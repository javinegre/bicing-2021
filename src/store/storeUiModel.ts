/* eslint-disable no-param-reassign */

import { action, Actions, computed, thunk } from 'easy-peasy';

import { IStoreModel, IStoreUiModel } from './interfaces';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';
import { StationSelectedType } from './types';

const storeUiModel: IStoreUiModel = {
  resourceShown: StationResourceTypeEnum.bikes,
  bikeTypeFilter: {
    [BikeTypeEnum.mechanical]: true,
    [BikeTypeEnum.electrical]: true,
  },
  infoMenuShown: computed(
    [
      (state, storeState): StationSelectedType =>
        storeState.map.stationSelectedID,
    ],
    (stationSelectedID) => stationSelectedID !== null,
  ),
  aboutMenuShown: false,
  hideInfoMenu: thunk((actions, payload, helpers) => {
    const mapStoreActions = (helpers.getStoreActions() as Actions<IStoreModel>)
      .map;
    mapStoreActions.selectStation(null);
  }),
  toggleAboutMenu: action((state, payload) => {
    state.aboutMenuShown = payload ?? false;
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
