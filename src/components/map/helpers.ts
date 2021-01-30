import enums from '../../enums';
import icons from './markerIcons';
import { IStationData, IStationList } from '../../interfaces';
import { IMarkerWithData } from './interfaces';

const getVisibleStations: (
  stationList: IStationList | null,
  mapHandler: google.maps.Map | null,
) => IStationData[] = (stationList, mapHandler) =>
  stationList?.stations.filter((station) =>
    mapHandler?.getBounds()?.contains({ lat: station.lat, lng: station.lng }),
  ) ?? [];

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

const getStationMarker: (
  station: IStationData,
  resourceShown:
    | typeof enums.StationResourceTypeEnum.bikes
    | typeof enums.StationResourceTypeEnum.docks,
  mapZoom: number,
) => string = (station, resourceShown, mapZoom) => {
  let color: 'black' | 'red' | 'orange' | 'green' | 'gray';
  const size: 'big' | 'small' = mapZoom >= 14 ? 'big' : 'small';
  const resourceNumber =
    resourceShown === enums.StationResourceTypeEnum.bikes
      ? station.bikes
      : station.docks;
  const activeResource = resourceShown;

  if (station.status === 1) {
    if (resourceNumber === 0) {
      color = 'black';
    } else if (resourceNumber <= 2) {
      color = 'red';
    } else if (resourceNumber <= 5) {
      color = 'orange';
    } else {
      color = 'green';
    }
  } else {
    color = 'gray';
  }

  return icons[activeResource][size][color];
};

export default {
  getVisibleStations,
  splitMarkerListByVisibility,
  isNotInList,
  getStationMarker,
};
