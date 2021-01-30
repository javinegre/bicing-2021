import { Action, Computed, Thunk } from 'easy-peasy';

import { IStationData, IStationList } from '../interfaces';
import { StationSelectedType } from './types';
import enums from '../enums';
import { IMapsCoordinates } from '../components/map/interfaces';

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
  resourceShown:
    | typeof enums.StationResourceTypeEnum.bikes
    | typeof enums.StationResourceTypeEnum.docks;
  mapCenter: IMapsCoordinates;
  mapZoom: number;
  infoMenuShown: Computed<IStoreUiModel, boolean>;
  aboutMenuShown: boolean;
  selectStation: Action<IStoreUiModel, StationSelectedType>;
  hideInfoMenu: Action<IStoreUiModel>;
  toggleAboutMenu: Action<IStoreUiModel, boolean | undefined>;
  toggleResourceShown: Action<IStoreUiModel>;
  setMapCenter: Action<IStoreUiModel, IMapsCoordinates>;
  setMapZoom: Action<IStoreUiModel, number>;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
  ui: IStoreUiModel;
}
