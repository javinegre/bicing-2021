import React, { useCallback, useEffect, useRef, useState } from 'react';

import Button from '../button/Button';
import Icon from '../ui/icon/icon';
import MapHints from './mapHints';
import useGoogleMaps from '../../hooks/useGoogleMaps';
import mapConfig from './config';
import mapHelpers from './helpers';
import storeHooks from '../../store/hooks';
import { IMarkerWithData } from './interfaces';
import { IStationData } from '../../interfaces';
import { BikeTypeEnum, StationResourceTypeEnum } from '../../enums';

import './Map.css';

const Map: React.FunctionComponent = () => {
  // /////////////////////////////////////////////////////////////////  Component State  /

  const $mapWrapper = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<IMarkerWithData[]>([]);
  const [areBoundsReady, setAreBoundsReady] = useState<boolean>(false);

  // ////////////////////////////////////////////////////////////////////  Store State  /

  const {
    stations,
    mapCenter,
    mapZoom,
    visibleStations,
    resourceShown,
    bikeTypeFilter,
    infoMenuShown,
  } = storeHooks.useStoreState((state) => ({
    stations: state.stationList.stations,
    mapCenter: state.map.mapCenter,
    mapZoom: state.map.mapZoom,
    visibleStations: state.map.visibleStations,
    resourceShown: state.ui.resourceShown,
    bikeTypeFilter: state.ui.bikeTypeFilter,
    infoMenuShown: state.ui.infoMenuShown,
  }));

  // //////////////////////////////////////////////////////////////////  Store Actions  /

  const {
    fetchStationList,
    setMapCenter,
    setMapZoom,
    setVisibleStations,
    selectStation,
    toggleResourceShown,
    toggleBikeType,
  } = storeHooks.useStoreActions((actions) => ({
    fetchStationList: actions.stationList.fetch,
    setMapCenter: actions.map.setMapCenter,
    setMapZoom: actions.map.setMapZoom,
    setVisibleStations: actions.map.setVisibleStations,
    selectStation: actions.map.selectStation,
    toggleResourceShown: actions.ui.toggleResourceShown,
    toggleBikeType: actions.ui.toggleBikeType,
  }));

  // ///////////////////////////////////////////////////////////////  Google Maps hook  /

  const { mapHandler, addMarker, removeMarker } = useGoogleMaps({
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

  // ////////////////////////////////////////////////////////////////////////  Effects  /

  useEffect(bindInitialEventsToMap, [mapHandler]);
  useEffect(updateStationVisibility, [stations, areBoundsReady]);
  useEffect(updateStationsWithinMap, [mapCenter, mapZoom]);
  useEffect(refreshIcons, [mapZoom]);
  useEffect(updateMarkersList, [visibleStations]);
  useEffect(refreshIcons, [resourceShown, bikeTypeFilter]);

  // ////////////////////////////////////////////////////////////////////////////////////

  const onDragEnd = useCallback(() => {
    // Google maps event. Update map center, map zoom and visible station after dragging map
    if (mapHandler) {
      setMapCenter({
        lat: mapHandler.getCenter().lat(),
        lng: mapHandler.getCenter().lng(),
      });
      setMapZoom(mapHandler.getZoom());
      setVisibleStations(mapHelpers.getVisibleStations(stations, mapHandler));
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
    addMarker(
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

  // /////////////////////////////////////////////////////////////////////  UI Actions  /

  const updateStationList: () => void = () => {
    fetchStationList();
  };

  const toggleResourceType: () => void = () => toggleResourceShown();

  const toggleBikeTypeTo: (bikeType: BikeTypeEnum) => () => void = (
    bikeType,
  ) => (): void => {
    toggleBikeType(bikeType);
  };

  return (
    <div className={`Map ${infoMenuShown ? 'Map--blurred' : ''}`}>
      <div ref={$mapWrapper} className="Map-wrapper" />

      <MapHints />

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row-reverse',
          bottom: 8,
          right: 8,
          height: 40,
          width: 192,
        }}
      >
        <Button onClick={updateStationList}>
          <Icon name="refresh" color="white" />
        </Button>

        <Button onClick={toggleResourceType}>
          {resourceShown === StationResourceTypeEnum.bikes ? (
            <Icon name="parking" color="white" />
          ) : (
            <Icon name="bike" color="white" size={24} />
          )}
        </Button>

        <Button
          onClick={toggleBikeTypeTo(BikeTypeEnum.electrical)}
          disabled={!bikeTypeFilter[BikeTypeEnum.electrical]}
        >
          <Icon name="bolt" color="white" />
        </Button>

        <Button
          onClick={toggleBikeTypeTo(BikeTypeEnum.mechanical)}
          disabled={!bikeTypeFilter[BikeTypeEnum.mechanical]}
        >
          <Icon name="gears" color="white" />
        </Button>
      </div>
    </div>
  );
};

export default Map;
