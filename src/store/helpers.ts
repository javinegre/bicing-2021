import { IStoreInitialState } from './interfaces';
import LocalStorageService from '../services/localStorageService';
import mapConfig from '../components/map/config';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';

export const getStoreInitialState: () => IStoreInitialState = () => {
  const localStorageService = LocalStorageService();

  return {
    map: {
      mapCenter:
        localStorageService.getPosition('mapCenter') ??
        mapConfig.mapOptions.center,
      mapZoom: localStorageService.getMapZoom() ?? mapConfig.mapOptions.zoom,
      userLocation: localStorageService.getUserLocation(),
    },
    ui: {
      resourceShown:
        localStorageService.getResourceShown() ?? StationResourceTypeEnum.bikes,
      bikeTypeFilter: localStorageService.getBikeTypeFilter() ?? {
        [BikeTypeEnum.mechanical]: true,
        [BikeTypeEnum.electrical]: true,
      },
    },
    bookmark: {
      home: localStorageService.getPosition('bookmarkHome'),
      work: localStorageService.getPosition('bookmarkWork'),
      favorite: localStorageService.getPosition('bookmarkFavorite'),
    },
  };
};

export default { getStoreInitialState };
