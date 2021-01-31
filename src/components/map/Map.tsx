import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import useGoogleMaps from '../../hooks/useGoogleMaps';
import mapConfig from './config';
import mapHelpers from './helpers';
import storeHooks from '../../store/hooks';
import { IMarkerWithData } from './interfaces';
import { IStationData } from '../../interfaces';
import { BikeTypeEnum } from '../../enums';

import './Map.css';
import Button from '../button/Button';

const Map: React.FunctionComponent = () => {
  const $mapWrapper = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<IMarkerWithData[]>([]);

  const {
    stationList,
    mapCenter,
    mapZoom,
    visibleStations,
    resourceShown,
    bikeTypeFilter,
  } = storeHooks.useStoreState((state) => ({
    stationList: state.stationList,
    mapCenter: state.map.mapCenter,
    mapZoom: state.map.mapZoom,
    visibleStations: state.map.visibleStations,
    resourceShown: state.ui.resourceShown,
    bikeTypeFilter: state.ui.bikeTypeFilter,
  }));

  const {
    fetchStationList,
    setMapCenter,
    setMapZoom,
    setVisibleStations,
    toggleAboutMenu,
    selectStation,
    toggleResourceShown,
    toggleBikeType,
  } = storeHooks.useStoreActions((actions) => ({
    fetchStationList: actions.stationList.fetch,
    setMapCenter: actions.map.setMapCenter,
    setMapZoom: actions.map.setMapZoom,
    setVisibleStations: actions.map.setVisibleStations,
    toggleAboutMenu: actions.ui.toggleAboutMenu,
    selectStation: actions.map.selectStation,
    toggleResourceShown: actions.ui.toggleResourceShown,
    toggleBikeType: actions.ui.toggleBikeType,
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
    mapHandler?.panTo(mapCenter);
  }, [mapCenter]);

  useEffect(() => {
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
  }, [resourceShown, bikeTypeFilter, mapZoom]);

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
        icon: mapHelpers.getStationMarker(
          station,
          resourceShown,
          bikeTypeFilter,
          mapZoom,
        ),
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

  const toggleBikeTypeTo: (bikeType: BikeTypeEnum) => () => void = (
    bikeType,
  ) => (): void => {
    toggleBikeType(bikeType);
  };

  const showAboutMenu: () => void = () => toggleAboutMenu(true);

  return (
    <div className="Map">
      <div ref={$mapWrapper} className="Map-wrapper" />

      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          height: 40,
          width: 40,
        }}
      >
        <Button onClick={showAboutMenu}>
          <span role="img" aria-label="About">
            ℹ️
          </span>
        </Button>
      </div>

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
          <span role="img" aria-label="Refresh">
            🔄
          </span>
        </Button>

        <Button onClick={toggleResourceType}>
          <span role="img" aria-label="Toggle">
            🔀
          </span>
        </Button>

        <Button
          onClick={toggleBikeTypeTo(BikeTypeEnum.electrical)}
          disabled={!bikeTypeFilter[BikeTypeEnum.electrical]}
        >
          <span role="img" aria-label="Toggle">
            ⚡️
          </span>
        </Button>

        <Button
          onClick={toggleBikeTypeTo(BikeTypeEnum.mechanical)}
          disabled={!bikeTypeFilter[BikeTypeEnum.mechanical]}
        >
          <span role="img" aria-label="Toggle">
            ⚙️
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Map;
