import { createStore } from 'easy-peasy';

import storeStationListModel from './stationListModel';
import { IStoreModel } from './interfaces';
import storeUiModel from './storeUiModel';

const storeModel = createStore<IStoreModel>({
  stationList: storeStationListModel,
  ui: storeUiModel,
});

export default storeModel;
