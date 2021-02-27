import React, { useCallback, useEffect, useRef, useState } from 'react';

import MapControls from '../mapControls/MapControls';
import MapHints from '../mapHints/MapHints';
import useGoogleMaps from '../../hooks/useGoogleMaps';
import useAriaProps from '../../hooks/useAriaProps';
import mapConfig from './config';
import mapHelpers from './helpers';
import storeHooks from '../../store/hooks';
import { IMarkerWithData } from './interfaces';
import { IStationData } from '../../interfaces';
import { AppFunctionComponent } from '../../types';

import './Map.css';

const Map: AppFunctionComponent = (props) => {
  // ///////////////////////////////////////////////////////////////////////////  Props  /
  const ariaProps = useAriaProps(props);

  // /////////////////////////////////////////////////////////////////  Component State  /

  const $mapWrapper = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<IMarkerWithData[]>([]);
  const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
  const [areBoundsReady, setAreBoundsReady] = useState<boolean>(false);

  // ////////////////////////////////////////////////////////////////////  Store State  /

  const {
    stations,
    mapCenter,
    mapZoom,
    userLocation,
    visibleStations,
    resourceShown,
    bikeTypeFilter,
    infoMenuShown,
  } = storeHooks.useStoreState((state) => ({
    stations: state.stationList.stations,
    mapCenter: state.map.mapCenter,
    mapZoom: state.map.mapZoom,
    userLocation: state.map.userLocation,
    visibleStations: state.map.visibleStations,
    resourceShown: state.ui.resourceShown,
    bikeTypeFilter: state.ui.bikeTypeFilter,
    infoMenuShown: state.ui.infoMenuShown,
  }));

  // //////////////////////////////////////////////////////////////////  Store Actions  /

  const {
    setMapCenter,
    setMapZoom,
    setVisibleStations,
    selectStation,
  } = storeHooks.useStoreActions((actions) => ({
    setMapCenter: actions.map.setMapCenter,
    setMapZoom: actions.map.setMapZoom,
    setVisibleStations: actions.map.setVisibleStations,
    selectStation: actions.map.selectStation,
  }));

  // ///////////////////////////////////////////////////////////////  Google Maps hook  /

  const {
    mapHandler,
    addMarker,
    addStationMarker,
    removeMarker,
  } = useGoogleMaps({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '',
    mapDiv: $mapWrapper.current,
    mapOptions: {
      ...mapConfig.mapOptions,
      center: mapCenter,
      zoom: mapZoom,
    },
  });

  // ///////////////////////////////////////////////////////////////  Google Maps hook  /

  const bindInitialEventsToMap: () => void = () => {
    if (mapHandler) {
      google.maps.event.clearInstanceListeners(mapHandler);

      mapHandler.addListener('dragend', onDragEnd);
      mapHandler.addListener('zoom_changed', onZoomChanged);

      // Important! Waiting for 'tilesloaded' event is the only way to make sure that
      // mapHandler.getBounds()?.contains() is ready and the markers can be render properly
      // on the map after page load. Once triggered, the listener is removed as it's no longer
      // necessary
      mapHandler.addListener('tilesloaded', () => {
        setAreBoundsReady(true);
        google.maps.event.clearListeners(mapHandler, 'tilesloaded');
      });
    }
  };

  // ///////////////////////////////////////////////////////////////  Effect Functions  /

  const updateStationVisibility: () => void = () => {
    if (stations.length && mapHandler) {
      // Remove all markers in map. As each marker is removed and rendered again
      // it creates the flickering effect after fetching new data.
      markerList.forEach(removeMarker);
      setMarkerList([]);

      setVisibleStations(mapHelpers.getVisibleStations(stations, mapHandler));
    }
  };

  const updateStationsWithinMap: () => void = () => {
    if (mapHandler) {
      mapHandler?.panTo(mapCenter);
      // Update visible stations after panning
      setVisibleStations(mapHelpers.getVisibleStations(stations, mapHandler));
    }
  };

  const updateMarkersList: () => void = () => {
    if (mapHandler) {
      // Differentiate between markers placed within map bounds and those that are not
      const [
        shownMarkers,
        hiddenMarkers,
      ] = mapHelpers.splitMarkerListByVisibility(markerList, mapHandler);

      // Remove markers as they are no longer visible
      hiddenMarkers.forEach(removeMarker);

      // Find which markers must be rendered on the map, filtering out those that are already present
      const newMarkers = visibleStations
        .filter(mapHelpers.isNotInList(shownMarkers))
        .map(addMarkerToMap);

      setMarkerList([...shownMarkers, ...newMarkers]);
    }
  };

  const refreshIcons: () => void = () => {
    // Re-render icons
    markerList.forEach((marker) => {
      marker.setIcon(
        mapHelpers.getStationMarker(
          marker.stationData,
          resourceShown,
          bikeTypeFilter,
          mapZoom,
        ),
      );
    });
  };

  const showUserLocation: () => void = () => {
    if (mapHandler) {
      if (userLocation !== null) {
        if (userMarker === null) {
          // Create new marker
          const newUserMarker = addMarker({
            position: userLocation,
            icon: mapHelpers.getUserLocationMarker(),
          });
          setUserMarker(newUserMarker);
        } else {
          // Update user location marker if already in map
          userMarker.setPosition(userLocation);
        }
      } else if (userMarker !== null) {
        // Remove any marker if user location not known
        userMarker.setMap(null);
        setUserMarker(null);
      }
    }
  };

  // ////////////////////////////////////////////////////////////////////////  Effects  /

  useEffect(bindInitialEventsToMap, [mapHandler]);
  useEffect(updateStationVisibility, [stations, areBoundsReady]);
  useEffect(updateStationsWithinMap, [mapCenter, mapZoom]);
  useEffect(refreshIcons, [mapZoom]);
  useEffect(updateMarkersList, [visibleStations]);
  useEffect(refreshIcons, [resourceShown, bikeTypeFilter]);
  useEffect(showUserLocation, [mapHandler, userLocation]);

  // ////////////////////////////////////////////////////////////////////////////////////

  const onDragEnd = useCallback(() => {
    // Google maps event. Update map center, map zoom and visible station after dragging map
    if (mapHandler) {
      setMapCenter({
        lat: mapHandler.getCenter().lat(),
        lng: mapHandler.getCenter().lng(),
      });
      setMapZoom(mapHandler.getZoom());
      selectStation(null);
    }
  }, [stations, mapHandler]);

  const onZoomChanged = useCallback(() => {
    // Google maps event. Update zoom values in the store when zoom is changed.
    if (mapHandler) {
      setMapZoom(mapHandler.getZoom());
    }
  }, [mapHandler]);

  const addMarkerToMap: (station: IStationData) => IMarkerWithData = (
    station,
  ) =>
    // Render marker on map and bind click event
    addStationMarker(
      station,
      {
        position: { lat: station.lat, lng: station.lng },
        icon: mapHelpers.getStationMarker(
          station,
          resourceShown,
          bikeTypeFilter,
          mapZoom,
        ),
      },
      () => {
        selectStation(station.id);
      },
    );

  return (
    <div
      className={`Map ${infoMenuShown ? 'Map--blurred' : ''}`}
      {...ariaProps}
    >
      <div ref={$mapWrapper} className="Map-wrapper" />

      <MapHints />

      <MapControls />
    </div>
  );
};

export default Map;
