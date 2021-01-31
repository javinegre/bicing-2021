import { IStationData } from '../../interfaces';

export interface IMapsCoordinates {
  lat: number;
  lng: number;
}

export interface IMarkerWithData extends google.maps.Marker {
  stationData: IStationData;
}

export interface INearbyAreaConfig {
  [zoom: number]: number;
}
