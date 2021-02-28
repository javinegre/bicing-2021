import { getStoreInitialState } from '../store/helpers';
import mapConfigMock from './mapConfig';

const { map: initialMapState } = getStoreInitialState();

const getMapHandlerMock: () => google.maps.Map = () => {
  const { lat: mapCenterLat, lng: mapCenterLng } = initialMapState.mapCenter;
  let mapBounds = mapConfigMock.mapBounds.initial;

  return {
    getCenter() {
      return {
        lat: (): number => mapCenterLat,
        lng: (): number => mapCenterLng,
      } as google.maps.LatLng;
    },
    getBounds() {
      return {
        contains: (coordinates: google.maps.LatLng): boolean => {
          const lat =
            typeof coordinates.lat === 'function'
              ? coordinates.lat()
              : coordinates.lat;
          const lng =
            typeof coordinates.lng === 'function'
              ? coordinates.lng()
              : coordinates.lng;

          return (
            lng > mapBounds.lngMin &&
            lng < mapBounds.lngMax &&
            lat > mapBounds.latMin &&
            lat < mapBounds.latMax
          );
        },
      };
    },
    changeBoundsMock(
      newMapBounds:
        | 'initial'
        | 'marinaMeridiana'
        | 'ciutatMeridiana'
        | 'outside',
    ) {
      mapBounds = mapConfigMock.mapBounds[newMapBounds];
    },
  } as google.maps.Map & { changeBoundsMock: any };
};

// eslint-disable-next-line import/prefer-default-export
export { getMapHandlerMock };
