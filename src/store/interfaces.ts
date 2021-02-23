import { Action, Thunk } from 'easy-peasy';

import {
  IStationData,
  IStationDataExtended,
  IStationList,
} from '../interfaces';
import { BikeTypeFilterType, StationSelectedType } from './types';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';
import { IMapsCoordinates } from '../components/map/interfaces';
import { INotificationItem } from '../components/ui/notification/interfaces';
import LocalStorageService from '../services/localStorageService';

export interface IStoreInitialState {
  map: {
    mapCenter: IMapsCoordinates;
    mapZoom: number;
    userLocation: IMapsCoordinates | null;
  };
  ui: {
    resourceShown: StationResourceTypeEnum;
    bikeTypeFilter: BikeTypeFilterType;
  };
  bookmark: {
    home: IMapsCoordinates | null;
    work: IMapsCoordinates | null;
    favorite: IMapsCoordinates | null;
  };
}

export interface IStoreInjections {
  LocalStorageService: typeof LocalStorageService;
}

export interface IStoreStationListModel extends IStationList {
  isDataLoading: boolean;
  setDataLoading: Action<IStoreStationListModel, boolean>;
  fetched: Action<IStoreStationListModel, IStationList>;
  fetch: Thunk<IStoreStationListModel>;
}

export interface IStoreMapModel {
  mapCenter: IMapsCoordinates;
  mapZoom: number;
  userLocation: IMapsCoordinates | null;
  stationSelectedID: StationSelectedType;
  stationSelectedData: IStationData | null;
  visibleStations: IStationDataExtended[];
  updateMapCenterState: Action<IStoreMapModel, IMapsCoordinates>;
  setMapCenter: Thunk<
    IStoreMapModel,
    IMapsCoordinates,
    IStoreInjections,
    IStoreModel
  >;
  updateMapZoomState: Action<IStoreMapModel, number>;
  setMapZoom: Thunk<IStoreMapModel, number, IStoreInjections, IStoreModel>;
  updateUserLocationState: Action<IStoreMapModel, IMapsCoordinates>;
  setUserLocation: Thunk<
    IStoreMapModel,
    IMapsCoordinates,
    IStoreInjections,
    IStoreModel
  >;
  selectStation: Thunk<
    IStoreMapModel,
    StationSelectedType,
    IStoreInjections,
    IStoreModel
  >;
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
  setResourceShown: Action<IStoreUiModel, StationResourceTypeEnum>;
  toggleResourceShown: Thunk<
    IStoreUiModel,
    undefined,
    IStoreInjections,
    IStoreModel
  >;
  setBikeType: Action<IStoreUiModel, BikeTypeFilterType>;
  toggleBikeType: Thunk<
    IStoreUiModel,
    BikeTypeEnum,
    IStoreInjections,
    IStoreModel
  >;
  toggleInfoMenu: Action<IStoreUiModel, boolean | undefined>;
  toggleAboutMenu: Action<IStoreUiModel, boolean | undefined>;
  pushNotification: Action<IStoreUiModel, INotificationItem>;
  popNotification: Action<IStoreUiModel>;
}

export interface IStoreBookmarkModel {
  home: IMapsCoordinates | null;
  work: IMapsCoordinates | null;
  favorite: IMapsCoordinates | null;
  updateHomeState: Action<IStoreBookmarkModel, IMapsCoordinates | null>;
  setHome: Thunk<
    IStoreBookmarkModel,
    IMapsCoordinates | null,
    IStoreInjections,
    IStoreModel
  >;
  updateWorkState: Action<IStoreBookmarkModel, IMapsCoordinates | null>;
  setWork: Thunk<
    IStoreBookmarkModel,
    IMapsCoordinates | null,
    IStoreInjections,
    IStoreModel
  >;
  updateFavoriteState: Action<IStoreBookmarkModel, IMapsCoordinates | null>;
  setFavorite: Thunk<
    IStoreBookmarkModel,
    IMapsCoordinates | null,
    IStoreInjections,
    IStoreModel
  >;
}

export interface IStoreModel {
  stationList: IStoreStationListModel;
  map: IStoreMapModel;
  ui: IStoreUiModel;
  bookmark: IStoreBookmarkModel;
}
