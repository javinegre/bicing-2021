import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import useGoogleMaps from '../../hooks/useGoogleMaps';
import mapConfig from './config';
import mapHelpers from './helpers';
import storeHooks from '../../store/hooks';
import { IStationData } from '../../interfaces';

import './Map.css';

const Map: React.FunctionComponent = () => {
  const $mapWrapper = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<google.maps.Marker[]>([]);

  const [visibleStations, setVisibleStations] = useState<IStationData[]>([]);

  const stationList = storeHooks.useStoreState((state) => state.stationList);
  const fetchStationList = storeHooks.useStoreActions(
    (actions) => actions.stationList.fetch,
  );

  const updateStationList: () => void = () => {
    fetchStationList();
  };

  const { mapHandler, addMarker, removeMarker } = useGoogleMaps({
    googleMapsApiKey: window.env?.GOOGLE_MAPS_API_KEY ?? '',
    mapDiv: $mapWrapper.current,
    mapOptions: mapConfig,
  });

  useEffect(() => {
    // Remove all markers in map
    markerList.forEach(removeMarker);
    setMarkerList([]);

    setVisibleStations(mapHelpers.getVisibleStations(stationList, mapHandler));

    if (stationList !== null && mapHandler) {
      google.maps.event.clearInstanceListeners(mapHandler);

      mapHandler?.addListener('bounds_changed', onBoundsChanged);
    }
  }, [stationList]);

  useEffect(() => {
    if (mapHandler) {
      const [
        shownMarkers,
        hiddenMarkers,
      ] = mapHelpers.splitMarkerListByVisibility(markerList, mapHandler);

      hiddenMarkers.forEach(removeMarker);

      const newMarkers = visibleStations
        .filter(mapHelpers.isNotInList(shownMarkers))
        .map(addMarkerToMap);

      setMarkerList([...shownMarkers, ...newMarkers]);
    }
  }, [mapHandler, visibleStations]);

  const onBoundsChanged = useCallback(
    debounce(() => {
      setVisibleStations(
        mapHelpers.getVisibleStations(stationList, mapHandler),
      );
    }, 200),
    [stationList],
  );

  const addMarkerToMap: (station: IStationData) => google.maps.Marker = (
    station,
  ) => {
    const newMarker = addMarker(
      {
        title: String(station.id),
        position: { lat: station.lat, lng: station.lng },
        icon: mapHelpers.getStationMarker(station),
      },
      () => {
        const newMarkerPosition = newMarker.getPosition();
        if (newMarkerPosition) {
          mapHandler?.panTo(newMarkerPosition);
        }
      },
    );

    return newMarker;
  };

  return (
    <div className="Map">
      <div ref={$mapWrapper} className="Map-wrapper" />
      <button
        className="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
        type="button"
        onClick={updateStationList}
        style={{ position: 'absolute', bottom: 8, right: 8 }}
      >
        <span role="img" aria-label="refresh">
          🔄
        </span>
      </button>
    </div>
  );
};

export default Map;
