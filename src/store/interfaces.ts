import { Action, ActionMapper, Computed, Thunk } from 'easy-peasy';

import { IStationData, IStationList } from '../interfaces';
import { StationSelectedType } from './types';
import enums from '../enums';
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
  resourceShown:
    | typeof enums.StationResourceTypeEnum.bikes
    | typeof enums.StationResourceTypeEnum.docks;
  infoMenuShown: Computed<IStoreUiModel, boolean, IStoreModel>;
  aboutMenuShown: boolean;
  hideInfoMenu: Thunk<
    IStoreUiModel,
    undefined,
    ActionMapper<IStoreModel, never>
  >;
  toggleAboutMenu: Action<IStoreUiModel, boolean | undefined>;
  toggleResourceShown: Action<IStoreUiModel>;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
  map: IStoreMapModel;
  ui: IStoreUiModel;
}
