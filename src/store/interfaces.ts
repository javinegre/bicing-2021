import { Action, ActionMapper, Thunk } from 'easy-peasy';

import {
  IStationData,
  IStationDataExtended,
  IStationList,
} from '../interfaces';
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
  visibleStations: IStationDataExtended[];
  setMapCenter: Action<IStoreMapModel, IMapsCoordinates>;
  setMapZoom: Action<IStoreMapModel, number>;
  selectStation: Thunk<IStoreMapModel, StationSelectedType, IStoreModel>;
  setStationSelectedID: Action<IStoreMapModel, StationSelectedType>;
  setStationSelectedData: Action<IStoreMapModel, IStationData | null>;
  setVisibleStations: Action<IStoreMapModel, IStationDataExtended[]>;
}

export interface IStoreUiModel {
  resourceShown: StationResourceTypeEnum;
  bikeTypeFilter: BikeTypeFilterType;
  infoMenuShown: boolean;
  aboutMenuShown: boolean;
  toggleResourceShown: Action<IStoreUiModel>;
  toggleBikeType: Action<IStoreUiModel, BikeTypeEnum>;
  toggleInfoMenu: Action<IStoreUiModel, boolean | undefined>;
  toggleAboutMenu: Action<IStoreUiModel, boolean | undefined>;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
  map: IStoreMapModel;
  ui: IStoreUiModel;
}
