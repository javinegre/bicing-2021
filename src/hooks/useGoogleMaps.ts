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

  return { mapHandler };
};

export default useGoogleMaps;
