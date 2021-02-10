import React from 'react';

import { IStationData } from '../interfaces';
import { IMarkerWithData } from '../components/map/interfaces';

export interface IGoogleMapsHookParams {
  googleMapsApiKey: string;
  mapDiv: HTMLElement | null;
  mapOptions?: google.maps.MapOptions;
}

export interface IGoogleMapsHook {
  mapHandler: google.maps.Map | null;
  addMarker: (opts: google.maps.ReadonlyMarkerOptions) => google.maps.Marker;
  addStationMarker: (
    stationData: IStationData,
    opts: google.maps.ReadonlyMarkerOptions,
    clickEvent?: () => void,
  ) => IMarkerWithData;
  removeMarker: (marker: IMarkerWithData) => void;
}

export interface IGeoLocationHook {
  geoLocation: GeolocationPosition | undefined;
  geoLocationError: GeolocationPositionError | undefined;
  geoLocate: () => void;
}

export interface ILongPressHookOptions {
  shouldPreventDefault?: boolean;
  delay?: number;
}

export interface ILongPressEvents<T> {
  onMouseDown: (event: React.MouseEvent<T, MouseEvent>) => void;
  onTouchStart: (event: React.TouchEvent<T>) => void;
  onMouseUp: (event: React.MouseEvent<T, MouseEvent>) => void;
  onMouseLeave: (event: React.MouseEvent<T, MouseEvent>) => void;
  onTouchEnd: (event: React.TouchEvent<T>) => void;
}
