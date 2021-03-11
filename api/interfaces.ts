/* eslint-disable camelcase */

import { AxiosError, AxiosResponse } from 'axios';
import {
  XHRApiStationInfoResponseType,
  XHRApiStationStatusResponseType,
} from '../src/services/types';
import { ApiEndpointType, DataTransformType } from './types';
import { IXHRErrorResponse, IXHRStationList } from '../src/services/interfaces';

export interface IApiConfig {
  bicingApiBaseUrl: string;
  endpoints: {
    [key in ApiEndpointType]: string;
  };
  cacheConfig: {
    [key in ApiEndpointType]: {
      key: string;
      ttl: number;
    };
  };
}

export interface IApiMethods {
  getStationInfo: () => Promise<XHRApiStationInfoResponseType>;
  getStationStatus: () => Promise<XHRApiStationStatusResponseType>;
}

export interface IOfficialApiStationInfo {
  station_id: number;
  name: string;
  lat: number;
  lon: number;
  // Not in use below
  physical_configuration: string; // 'ELECTRICBIKESTATION'
  altitude: number;
  address: string;
  post_code: number;
  capacity: number;
  nearby_distance: number;
}

export interface IOfficialApiStationStatus {
  station_id: number;
  num_docks_available: number;
  num_bikes_available_types: {
    mechanical: number;
    ebike: number;
  };
  status: string; // 'IN_SERVICE';
  // Not in use below
  num_bikes_available: number;
  last_reported: number;
  is_charging_station: boolean;
  is_installed: number;
  is_renting: number;
  is_returning: number;
}

export interface IOfficialApiResult<T> {
  last_updated: number;
  data: {
    stations: T[];
  };
}

export interface IResponseHelpers {
  handleResponseData: <T>(
    response: AxiosResponse<IOfficialApiResult<T>>,
  ) => AxiosResponse<IOfficialApiResult<T>> | Promise<never>;
  handleSuccessfulResponse: <OT, TT>(
    stationTransformer: DataTransformType<OT, TT>,
  ) => (response: AxiosResponse<IOfficialApiResult<OT>>) => IXHRStationList<TT>;
  handleErrorResponse: (err: AxiosError) => IXHRErrorResponse;
}
