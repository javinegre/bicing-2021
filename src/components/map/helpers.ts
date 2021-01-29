import { IStationData, IStationList } from '../../interfaces';
import enums from '../../enums';
import icons from './markerIcons';

const getVisibleStations: (
  stationList: IStationList | null,
  mapHandler: google.maps.Map | null,
) => IStationData[] = (stationList, mapHandler) =>
  stationList?.stations.filter((station) =>
    mapHandler?.getBounds()?.contains({ lat: station.lat, lng: station.lng }),
  ) ?? [];

const splitMarkerListByVisibility: (
  markerList: google.maps.Marker[],
  mapHandler: google.maps.Map,
) => [google.maps.Marker[], google.maps.Marker[]] = (markerList, mapHandler) =>
  markerList.reduce<[google.maps.Marker[], google.maps.Marker[]]>(
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
  list: google.maps.Marker[],
) => (station: IStationData) => boolean = (list) => (station): boolean =>
  list.find((marker) => station.id === +(marker.getTitle() ?? 0)) === undefined;

const getStationMarker: (station: IStationData) => string = (station) => {
  let color: 'black' | 'red' | 'orange' | 'green' | 'gray' = 'gray';
  const size: 'big' | 'small' = 'big';
  const resourceNumber = station.bikes;
  const activeResource = enums.StationResourceTypeEnum.bikes;

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
