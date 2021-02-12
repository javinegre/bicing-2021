import { MarkerColorType } from './types';

export interface IStationData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  bikes: number;
  docks: number;
  electrical: number;
  mechanical: number;
  status: 0 | 1;
}

export interface IStationDataExtended extends IStationData {
  distance: number;
  inNearbyArea: boolean;
}

export interface IStationList {
  updateTime: number | null;
  stations: IStationData[];
}

export interface IMarkerStateColor {
  threshold: number;
  color: MarkerColorType;
}

export interface IMarkerColorConfig {
  inactive: IMarkerStateColor;
  none: IMarkerStateColor;
  danger: IMarkerStateColor;
  warning: IMarkerStateColor;
  success: IMarkerStateColor;
}
