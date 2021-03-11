import {
  IXHRErrorResponse,
  IXHRStationInfo,
  IXHRStationList,
  IXHRStationStatus,
} from './interfaces';

export type LocalStoragePositionKeyType =
  | 'mapCenter'
  | 'userLocation'
  | 'bookmarkHome'
  | 'bookmarkWork'
  | 'bookmarkFavorite';

export type LocalStorageNumberKeyType = 'mapZoom' | 'userLocationTimestamp';

export type LocalStorageKeyType =
  | LocalStoragePositionKeyType
  | LocalStorageNumberKeyType
  | 'resourceShown'
  | 'bikeTypeFilter';

export type XHRApiResponseType<T> =
  | IXHRStationList<T>
  | IXHRErrorResponse
  | null;

export type XHRApiStationInfoResponseType = XHRApiResponseType<IXHRStationInfo>;
export type XHRApiStationStatusResponseType = XHRApiResponseType<IXHRStationStatus>;
