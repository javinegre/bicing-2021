import { IStationList } from '../interfaces';
import { IMapsCoordinates } from '../components/map/interfaces';
import { LocalStoragePositionKeyType } from './types';
import { StationResourceTypeEnum } from '../enums';
import { BikeTypeFilterType } from '../store/types';

export interface IXHRStationInfo {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface IXHRStationStatus {
  i: number;
  e: number;
  m: number;
  d: number;
  s: 0 | 1;
}

export interface IXHRStationList<T> {
  success: true;
  last_updated: number;
  stations: Array<T>;
}

export interface IXHRErrorResponse {
  success: false;
  errorMessage: string;
}

export interface IStationService {
  getList: () => Promise<IStationList | null>;
}

export interface ILocalStorageService {
  getPosition: (key: LocalStoragePositionKeyType) => IMapsCoordinates | null;
  setPosition: (
    key: LocalStoragePositionKeyType,
    payload: IMapsCoordinates | null,
  ) => void;
  getUserLocation: () => IMapsCoordinates | null;
  setUserLocation: (payload: IMapsCoordinates | null) => void;
  getMapZoom: () => number | null;
  setMapZoom: (payload: number | null) => void;
  getResourceShown: () => StationResourceTypeEnum | null;
  setResourceShown: (payload: StationResourceTypeEnum | null) => void;
  getBikeTypeFilter: () => BikeTypeFilterType | null;
  setBikeTypeFilter: (payload: BikeTypeFilterType | null) => void;
}
