import { useEffect, useState } from 'react';

import useScript from './useScript';
import { IGoogleMapsHook, IGoogleMapsHookParams } from './interfaces';

const useGoogleMaps: (params: IGoogleMapsHookParams) => IGoogleMapsHook = (
  params,
) => {
  const [mapHandler, setMapHandler] = useState<google.maps.Map | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const { googleMapsApiKey, mapDiv, mapOptions } = params;

  const apiUrl: string = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initGoogleMapCallback`;

  useScript(apiUrl);

  const initMap: () => void = () => {
    setIsInitialized(true);
  };

  useEffect(() => {
    (window as any).initGoogleMapCallback = initMap;
  }, []);

  useEffect(() => {
    if (isInitialized && mapDiv !== null) {
      const map: google.maps.Map = new window.google.maps.Map(
        mapDiv,
        mapOptions,
      );
      setMapHandler(map);
    }
  }, [isInitialized, mapDiv]);

  const addMarker: (
    opts: google.maps.ReadonlyMarkerOptions,
    clickEvent?: () => void,
  ) => google.maps.Marker = (opts, clickEvent) => {
    const newMarker = new google.maps.Marker({
      map: mapHandler as google.maps.Map,
      ...opts,
    });

    if (clickEvent) {
      newMarker.addListener('click', clickEvent);
    }

    return newMarker;
  };

  const removeMarker: (marker: google.maps.Marker) => void = (marker) => {
    google.maps.event.clearInstanceListeners(marker);
    marker.setMap(null);
  };

  return { mapHandler, addMarker, removeMarker };
};

export default useGoogleMaps;
