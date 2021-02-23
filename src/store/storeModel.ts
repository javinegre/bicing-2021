import { createStore } from 'easy-peasy';

import { IStoreInitialState, IStoreModel } from './interfaces';
import storeStationListModel from './stationListModel';
import storeMapModel from './storeMapModel';
import storeUiModel from './storeUiModel';
import storeBookmarkModel from './storeBookmarkModel';
import LocalStorageService from '../services/localStorageService';
import { getStoreInitialState } from './helpers';

const storeModel = createStore<IStoreModel, IStoreInitialState>(
  {
    stationList: storeStationListModel,
    map: storeMapModel,
    ui: storeUiModel,
    bookmark: storeBookmarkModel,
  },
  {
    initialState: getStoreInitialState(),
    injections: { LocalStorageService },
  },
);

export default storeModel;
