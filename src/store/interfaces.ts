import { Action, Thunk } from 'easy-peasy';
import { IStationList } from '../interfaces';

export interface IStoreStationListModel extends IStationList {
  fetched: Action<IStoreStationListModel, IStationList>;
  fetch: Thunk<IStoreStationListModel, undefined>;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
}
