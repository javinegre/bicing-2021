import { IStationData } from '../../interfaces';
import { MarkerColorType } from './types';

export interface IMapsCoordinates {
  lat: number;
  lng: number;
}

export interface IMarkerWithData extends google.maps.Marker {
  stationData: IStationData;
}

export interface INearbyAreaHintConfig {
  [zoom: number]: number;
}

export interface INearbyAreaRadius {
  lat: number;
  lng: number;
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
