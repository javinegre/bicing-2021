import { IStoreInitialState } from './interfaces';
import LocalStorageService from '../services/localStorageService';
import mapConfig from '../components/map/config';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';

export const getStoreInitialState: () => IStoreInitialState = () => {
  const localStorageService = LocalStorageService();

  return {
    stationList: {
      updateTime: null,
      stations: [],
      isDataLoading: false,
    },
    map: {
      mapCenter:
        localStorageService.getPosition('mapCenter') ??
        mapConfig.mapOptions.center,
      mapZoom: localStorageService.getMapZoom() ?? mapConfig.mapOptions.zoom,
      userLocation: localStorageService.getUserLocation(),
      stationSelectedID: null,
      stationSelectedData: null,
      visibleStations: [],
    },
    ui: {
      resourceShown:
        localStorageService.getResourceShown() ?? StationResourceTypeEnum.bikes,
      bikeTypeFilter: localStorageService.getBikeTypeFilter() ?? {
        [BikeTypeEnum.mechanical]: true,
        [BikeTypeEnum.electrical]: true,
      },
      infoMenuShown: false,
      aboutMenuShown: false,
      notificationList: [],
    },
    bookmark: {
      home: localStorageService.getPosition('bookmarkHome'),
      work: localStorageService.getPosition('bookmarkWork'),
      favorite: localStorageService.getPosition('bookmarkFavorite'),
    },
  };
};

export default { getStoreInitialState };
