export interface IGoogleMapsHookParams {
  googleMapsApiKey: string;
  mapDiv: HTMLElement | null;
  mapOptions?: google.maps.MapOptions;
}

export interface IGoogleMapsHook {
  mapHandler: google.maps.Map | null;
}
