import { IStationData } from '../interfaces';
import { IMarkerWithData } from '../components/map/interfaces';

export interface IGoogleMapsHookParams {
  googleMapsApiKey: string;
  mapDiv: HTMLElement | null;
  mapOptions?: google.maps.MapOptions;
}

export interface IGoogleMapsHook {
  mapHandler: google.maps.Map | null;
  addMarker: (
    stationData: IStationData,
    opts: google.maps.ReadonlyMarkerOptions,
    clickEvent?: () => void,
  ) => IMarkerWithData;
  removeMarker: (marker: IMarkerWithData) => void;
}
