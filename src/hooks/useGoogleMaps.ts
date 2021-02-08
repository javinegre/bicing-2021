import { useEffect, useState } from 'react';

import useScript from './useScript';
import { IGoogleMapsHook, IGoogleMapsHookParams } from './interfaces';
import { IStationData } from '../interfaces';
import { IMarkerWithData } from '../components/map/interfaces';

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
    window.initGoogleMapCallback = initMap;
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
  ) => google.maps.Marker = (opts) =>
    new google.maps.Marker({
      map: mapHandler as google.maps.Map,
      ...opts,
    });

  const addStationMarker: (
    stationData: IStationData,
    opts: google.maps.ReadonlyMarkerOptions,
    clickEvent?: () => void,
  ) => IMarkerWithData = (stationData, opts, clickEvent) => {
    const newMarker = new google.maps.Marker({
      map: mapHandler as google.maps.Map,
      ...opts,
    });

    newMarker.setValues({
      stationData,
    });

    if (clickEvent) {
      newMarker.addListener('click', clickEvent);
    }

    return newMarker as IMarkerWithData;
  };

  const removeMarker: (marker: IMarkerWithData) => void = (marker) => {
    google.maps.event.clearInstanceListeners(marker);
    marker.setMap(null);
  };

  return { mapHandler, addMarker, addStationMarker, removeMarker };
};

export default useGoogleMaps;
