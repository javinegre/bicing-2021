/* eslint-disable no-param-reassign */

import { action, Actions, computed, thunk } from 'easy-peasy';

import { IStoreModel, IStoreUiModel } from './interfaces';
import enums from '../enums';
import { StationSelectedType } from './types';

const storeUiModel: IStoreUiModel = {
  resourceShown: enums.StationResourceTypeEnum.bikes,
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
      state.resourceShown === enums.StationResourceTypeEnum.bikes
        ? enums.StationResourceTypeEnum.docks
        : enums.StationResourceTypeEnum.bikes;
  }),
};

export default storeUiModel;
