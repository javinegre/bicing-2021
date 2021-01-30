import { Action, Computed, Thunk } from 'easy-peasy';
import { IStationData, IStationList } from '../interfaces';
import { StationSelectedType } from './types';

export interface IStoreStationListModel extends IStationList {
  fetched: Action<IStoreStationListModel, IStationList>;
  fetch: Thunk<IStoreStationListModel, undefined>;
}

export interface IStoreUiModel {
  stationSelectedID: StationSelectedType;
  stationSelectedData: Computed<
    IStoreUiModel,
    IStationData | null,
    IStoreModel
  >;
  infoMenuShown: Computed<IStoreUiModel, boolean>;
  aboutMenuShown: boolean;
  selectStation: Action<IStoreUiModel, StationSelectedType>;
  hideInfoMenu: Action<IStoreUiModel>;
  toggleAboutMenu: Action<IStoreUiModel, boolean | undefined>;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
  ui: IStoreUiModel;
}
