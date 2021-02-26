import { getStoreInitialState } from '../store/helpers';
import mapConfigMock from './mapConfig';

const { map: initialMapState } = getStoreInitialState();

const mapHandlerMock = {
  getCenter() {
    return {
      lat: (): number => initialMapState.mapCenter.lat,
      lng: (): number => initialMapState.mapCenter.lng,
    } as google.maps.LatLng;
  },
  getBounds() {
    return {
      contains: ({ lat, lng }): boolean =>
        lng > mapConfigMock.initialMapBounds.lngMin &&
        lng < mapConfigMock.initialMapBounds.lngMax &&
        lat > mapConfigMock.initialMapBounds.latMin &&
        lat < mapConfigMock.initialMapBounds.latMax,
    };
  },
} as google.maps.Map;

export default mapHandlerMock;
