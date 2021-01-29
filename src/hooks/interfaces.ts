export interface IGoogleMapsHookParams {
  googleMapsApiKey: string;
  mapDiv: HTMLElement | null;
  mapOptions?: google.maps.MapOptions;
}

export interface IGoogleMapsHook {
  mapHandler: google.maps.Map | null;
  addMarker: (
    opts: google.maps.ReadonlyMarkerOptions,
    clickEvent?: () => void,
  ) => google.maps.Marker;
  removeMarker: (marker: google.maps.Marker) => void;
}
