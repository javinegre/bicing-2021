import appConfig from '../../config';
import icons from './markerIcons';
import userLocationIcon from '../../assets/icons/ui/user-location.svg';
import { IStationData, IStationDataExtended } from '../../interfaces';
import { IMapsCoordinates, IMarkerWithData } from './interfaces';
import { BikeTypeFilterType } from '../../store/types';
import { MarkerColorType, MarkerSizeType } from '../../types';
import {
  BikeTypeEnum,
  StationResourceTypeEnum,
  StationStatusEnum,
} from '../../enums';

const getMapHandlerCenterCoordinates: (
  mapHandler: google.maps.Map | null,
) => IMapsCoordinates = (mapHandler) => ({
  lat: mapHandler?.getCenter().lat() ?? 0,
  lng: mapHandler?.getCenter().lng() ?? 0,
});

const getStationDistance: (
  stationData: IStationData,
  center: IMapsCoordinates,
) => number = (station, center) =>
  Math.sqrt((center.lat - station.lat) ** 2 + (center.lng - station.lng) ** 2);

const isInNearbyArea: (
  point: IStationData,
  center: IMapsCoordinates,
) => boolean = (point, center) => {
  // From: https://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse
  //   (pointLat - centerLat)²    (pointLng - centerLng)²
  //  ------------------------ + ------------------------ ≤ 1
  //         radiusLat²                 radiusLng²
  const radiusLat: number = 0.0030375;
  const radiusLng: number = 0.00405;

  return (
    (point.lat - center.lat) ** 2 / radiusLat ** 2 +
      (point.lng - center.lng) ** 2 / radiusLng ** 2 <=
    1
  );
};

const getVisibleStations: (
  stations: IStationData[],
  mapHandler: google.maps.Map | null,
) => IStationDataExtended[] = (stations, mapHandler) => {
  const mapCenter = getMapHandlerCenterCoordinates(mapHandler);

  const filteredStations =
    stations.filter((station) =>
      mapHandler?.getBounds()?.contains({ lat: station.lat, lng: station.lng }),
    ) ?? [];

  return filteredStations.map((station) => ({
    ...station,
    distance: getStationDistance(station, mapCenter),
    inNearbyArea: isInNearbyArea(station, mapCenter),
  }));
};

const splitMarkerListByVisibility: (
  markerList: IMarkerWithData[],
  mapHandler: google.maps.Map,
) => [IMarkerWithData[], IMarkerWithData[]] = (markerList, mapHandler) =>
  markerList.reduce<[IMarkerWithData[], IMarkerWithData[]]>(
    ([shown, hidden], cur) => {
      const markerPosition = cur.getPosition();
      const isVisible: boolean = markerPosition
        ? mapHandler.getBounds()?.contains(markerPosition) ?? false
        : false;

      return isVisible ? [[...shown, cur], hidden] : [shown, [...hidden, cur]];
    },
    [[], []],
  );

const isNotInList: (
  list: IMarkerWithData[],
) => (station: IStationData) => boolean = (list) => (station): boolean =>
  list.find((marker) => station.id === marker.stationData.id) === undefined;

const getStationResourceNumber: (
  station: IStationData,
  resourceShown: StationResourceTypeEnum,
  bikeTypeFilter: BikeTypeFilterType,
) => number = (station, resourceShown, bikeTypeFilter) => {
  let resourceNumber;

  if (resourceShown === StationResourceTypeEnum.bikes) {
    if (
      bikeTypeFilter[BikeTypeEnum.mechanical] &&
      !bikeTypeFilter[BikeTypeEnum.electrical]
    ) {
      resourceNumber = station.mechanical;
    } else if (
      !bikeTypeFilter[BikeTypeEnum.mechanical] &&
      bikeTypeFilter[BikeTypeEnum.electrical]
    ) {
      resourceNumber = station.electrical;
    } else {
      resourceNumber = station.bikes;
    }
  } else {
    resourceNumber = station.docks;
  }

  return resourceNumber;
};

const getStationMarkerSize: (
  station: IStationData,
  mapZoom: number,
) => MarkerSizeType = (station, mapZoom) =>
  mapZoom >= appConfig.mapMarkerSizeZoomThreshold ? 'big' : 'small';

const getStationMarkerColor: (
  station: IStationData,
  resourceNumber: number,
) => MarkerColorType = (station, resourceNumber) => {
  let color: MarkerColorType;
  const colorConfig = appConfig.markerColor;

  if (station.status === StationStatusEnum.active) {
    if (resourceNumber === colorConfig.none.threshold) {
      color = colorConfig.none.color;
    } else if (resourceNumber <= colorConfig.danger.threshold) {
      color = colorConfig.danger.color;
    } else if (resourceNumber <= colorConfig.warning.threshold) {
      color = colorConfig.warning.color;
    } else {
      color = colorConfig.success.color;
    }
  } else {
    color = colorConfig.inactive.color;
  }

  return color;
};

const getStationMarker: (
  station: IStationData,
  resourceShown: StationResourceTypeEnum,
  bikeTypeFilter: BikeTypeFilterType,
  mapZoom: number,
) => string = (station, resourceShown, bikeTypeFilter, mapZoom) => {
  const resourceNumber = getStationResourceNumber(
    station,
    resourceShown,
    bikeTypeFilter,
  );
  const size = getStationMarkerSize(station, mapZoom);
  const color = getStationMarkerColor(station, resourceNumber);

  return icons[resourceShown][size][color];
};

const getUserLocationMarker: () => string = () => userLocationIcon;

export default {
  getVisibleStations,
  splitMarkerListByVisibility,
  isNotInList,
  getStationMarker,
  getUserLocationMarker,
};
