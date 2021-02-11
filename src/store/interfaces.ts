import { Action, Computed, Thunk } from 'easy-peasy';

import {
  IStationData,
  IStationDataExtended,
  IStationList,
} from '../interfaces';
import { BikeTypeFilterType, StationSelectedType } from './types';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';
import { IMapsCoordinates } from '../components/map/interfaces';
import { INotificationItem } from '../components/ui/notification/interfaces';

export interface IStoreStationListModel extends IStationList {
  fetched: Action<IStoreStationListModel, IStationList>;
  fetch: Thunk<IStoreStationListModel, undefined>;
}

export interface IStoreMapModel {
  mapCenter: IMapsCoordinates;
  mapZoom: number;
  userLocation: IMapsCoordinates | null;
  stationSelectedID: StationSelectedType;
  stationSelectedData: IStationData | null;
  visibleStations: IStationDataExtended[];
  setMapCenter: Action<IStoreMapModel, IMapsCoordinates>;
  setMapZoom: Action<IStoreMapModel, number>;
  setUserLocation: Action<IStoreMapModel, IMapsCoordinates>;
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
  notificationList: INotificationItem[];
  toggleResourceShown: Action<IStoreUiModel>;
  toggleBikeType: Action<IStoreUiModel, BikeTypeEnum>;
  toggleInfoMenu: Action<IStoreUiModel, boolean | undefined>;
  toggleAboutMenu: Action<IStoreUiModel, boolean | undefined>;
  pushNotification: Action<IStoreUiModel, INotificationItem>;
  popNotification: Action<IStoreUiModel>;
}

export interface IStoreBookmarkModel {
  home: IMapsCoordinates | null;
  work: IMapsCoordinates | null;
  favorite: IMapsCoordinates | null;
  setHome: Action<IStoreBookmarkModel, IMapsCoordinates | null>;
  setWork: Action<IStoreBookmarkModel, IMapsCoordinates | null>;
  setFavorite: Action<IStoreBookmarkModel, IMapsCoordinates | null>;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
  map: IStoreMapModel;
  ui: IStoreUiModel;
  bookmark: IStoreBookmarkModel;
}
