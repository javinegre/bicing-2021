import { IStationData } from '../../interfaces';

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
