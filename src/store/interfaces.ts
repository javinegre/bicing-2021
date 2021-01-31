import { Action, ActionMapper, Computed, Thunk } from 'easy-peasy';

import { IStationData, IStationList } from '../interfaces';
import { BikeTypeFilterType, StationSelectedType } from './types';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';
import { IMapsCoordinates } from '../components/map/interfaces';

export interface IStoreStationListModel extends IStationList {
  fetched: Action<IStoreStationListModel, IStationList>;
  fetch: Thunk<IStoreStationListModel, undefined>;
}

export interface IStoreMapModel {
  mapCenter: IMapsCoordinates;
  mapZoom: number;
  stationSelectedID: StationSelectedType;
  stationSelectedData: IStationData | null;
  visibleStations: IStationData[];
  setMapCenter: Action<IStoreMapModel, IMapsCoordinates>;
  setMapZoom: Action<IStoreMapModel, number>;
  selectStation: Thunk<IStoreMapModel, StationSelectedType, IStoreModel>;
  setStationSelectedID: Action<IStoreMapModel, StationSelectedType>;
  setStationSelectedData: Action<IStoreMapModel, IStationData | null>;
  setVisibleStations: Action<IStoreMapModel, IStationData[]>;
}

export interface IStoreUiModel {
  resourceShown: StationResourceTypeEnum;
  bikeTypeFilter: BikeTypeFilterType;
  infoMenuShown: Computed<IStoreUiModel, boolean, IStoreModel>;
  aboutMenuShown: boolean;
  toggleResourceShown: Action<IStoreUiModel>;
  toggleBikeType: Action<IStoreUiModel, BikeTypeEnum>;
  hideInfoMenu: Thunk<
    IStoreUiModel,
    undefined,
    ActionMapper<IStoreModel, never>
  >;
  toggleAboutMenu: Action<IStoreUiModel, boolean | undefined>;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
  map: IStoreMapModel;
  ui: IStoreUiModel;
}
