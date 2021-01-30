import { createStore } from 'easy-peasy';

import storeStationListModel from './stationListModel';
import { IStoreModel } from './interfaces';

const storeModel = createStore<IStoreModel>({
  stationList: storeStationListModel,
});

export default storeModel;
