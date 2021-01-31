import { createStore } from 'easy-peasy';

import { IStoreModel } from './interfaces';
import storeStationListModel from './stationListModel';
import storeMapModel from './storeMapModel';
import storeUiModel from './storeUiModel';

const storeModel = createStore<IStoreModel>({
  stationList: storeStationListModel,
  map: storeMapModel,
  ui: storeUiModel,
});

export default storeModel;
