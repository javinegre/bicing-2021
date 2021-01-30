import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import useGoogleMaps from '../../hooks/useGoogleMaps';
import mapConfig from './config';
import mapHelpers from './helpers';
import storeHooks from '../../store/hooks';
import { IMarkerWithData } from './interfaces';
import { IStationData } from '../../interfaces';

import './Map.css';

const Map: React.FunctionComponent = () => {
  const $mapWrapper = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<IMarkerWithData[]>([]);

  const [visibleStations, setVisibleStations] = useState<IStationData[]>([]);

  const {
    stationList,
    resourceShown,
    mapCenter,
    mapZoom,
  } = storeHooks.useStoreState((state) => ({
    stationList: state.stationList,
    resourceShown: state.ui.resourceShown,
    mapCenter: state.ui.mapCenter,
    mapZoom: state.ui.mapZoom,
  }));
  const {
    fetchStationList,
    toggleAboutMenu,
    selectStation,
    toggleResourceShown,
    setMapCenter,
    setMapZoom,
  } = storeHooks.useStoreActions((actions) => ({
    fetchStationList: actions.stationList.fetch,
    toggleAboutMenu: actions.ui.toggleAboutMenu,
    selectStation: actions.ui.selectStation,
    toggleResourceShown: actions.ui.toggleResourceShown,
    setMapCenter: actions.ui.setMapCenter,
    setMapZoom: actions.ui.setMapZoom,
  }));

  const updateStationList: () => void = () => {
    fetchStationList();
  };

  const { mapHandler, addMarker, removeMarker } = useGoogleMaps({
    googleMapsApiKey: window.env?.GOOGLE_MAPS_API_KEY ?? '',
    mapDiv: $mapWrapper.current,
    mapOptions: {
      ...mapConfig,
      center: mapCenter,
      zoom: mapZoom,
    },
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

  useEffect(() => {
    // Re-render icons
    markerList.forEach((marker) => {
      marker.setIcon(
        mapHelpers.getStationMarker(marker.stationData, resourceShown, mapZoom),
      );
    });
  }, [resourceShown, mapZoom]);

  const onBoundsChanged = useCallback(
    debounce(() => {
      if (mapHandler) {
        setMapCenter({
          lat: mapHandler.getCenter().lat(),
          lng: mapHandler.getCenter().lng(),
        });
        setMapZoom(mapHandler.getZoom());
      }
      setVisibleStations(
        mapHelpers.getVisibleStations(stationList, mapHandler),
      );
    }, 200),
    [stationList],
  );

  const addMarkerToMap: (station: IStationData) => IMarkerWithData = (
    station,
  ) => {
    const newMarker = addMarker(
      station,
      {
        position: { lat: station.lat, lng: station.lng },
        icon: mapHelpers.getStationMarker(station, resourceShown, mapZoom),
      },
      () => {
        const newMarkerPosition = newMarker.getPosition();

        selectStation(station.id);

        if (newMarkerPosition) {
          mapHandler?.panTo(newMarkerPosition);
        }
      },
    );

    return newMarker;
  };

  const toggleResourceType: () => void = () => toggleResourceShown();

  const showAboutMenu: () => void = () => toggleAboutMenu(true);

  return (
    <div className="Map">
      <div ref={$mapWrapper} className="Map-wrapper" />

      <button
        className="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
        type="button"
        onClick={showAboutMenu}
        style={{ position: 'absolute', top: 8, right: 8 }}
      >
        <span role="img" aria-label="About">
          ℹ️
        </span>
      </button>

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

      <button
        className="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-full focus:shadow-outline hover:bg-indigo-800"
        type="button"
        onClick={toggleResourceType}
        style={{ position: 'absolute', bottom: 8, right: 64 }}
      >
        <span role="img" aria-label="toggle">
          🔀
        </span>
      </button>
    </div>
  );
};

export default Map;
