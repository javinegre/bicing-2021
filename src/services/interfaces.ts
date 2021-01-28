import { IStationList } from '../interfaces';

export interface IXHRStationInfo {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface IXHRStationInfoList {
  last_updated: number;
  stations: IXHRStationInfo[];
}

export interface IXHRStationStatus {
  i: number;
  e: number;
  m: number;
  d: number;
  s: 0 | 1;
}

export interface IXHRStationStatusList {
  last_updated: number;
  stations: IXHRStationStatus[];
}

export interface IStationService {
  getList: () => Promise<IStationList | null>;
}
