import { IMapsCoordinates } from '../components/map/interfaces';
import { ILocalStorageService } from './interfaces';
import {
  LocalStorageNumberKeyType,
  LocalStoragePositionKeyType,
} from './types';

const LocalStorageService: () => ILocalStorageService = () => {
  const userLocationKey = 'userLocation';
  const userLocationTimestampKey = 'userLocationTimestamp';
  const userLocationTtl = 7200000; // 2h
  const mapZoomKey = 'mapZoom';

  const getNumberValue: (key: LocalStorageNumberKeyType) => number | null = (
    key,
  ) => {
    const numberValue = window.localStorage.getItem(key);
    if (!numberValue) {
      return null;
    }
    try {
      const parsedNumberValue = JSON.parse(numberValue);
      return typeof parsedNumberValue === 'number' ? parsedNumberValue : null;
    } catch {
      return null;
    }
  };

  const setValue: (
    key: LocalStoragePositionKeyType | LocalStorageNumberKeyType,
    payload: IMapsCoordinates | number | null,
  ) => void = (key, payload) =>
    window.localStorage.setItem(key, JSON.stringify(payload));

  const getPosition: (
    key: LocalStoragePositionKeyType,
  ) => IMapsCoordinates | null = (key) => {
    const value = window.localStorage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      const parsedValue = JSON.parse(value);
      return typeof parsedValue.lat === 'number' &&
        typeof parsedValue.lng === 'number'
        ? parsedValue
        : null;
    } catch {
      return null;
    }
  };

  const setPosition: (
    key: LocalStoragePositionKeyType,
    payload: IMapsCoordinates | null,
  ) => void = (key, payload) => setValue(key, payload);

  const getUserLocation: () => IMapsCoordinates | null = () => {
    const userLocation = getPosition(userLocationKey);
    const timestamp = getNumberValue(userLocationTimestampKey);

    if (userLocation !== null && timestamp !== null) {
      const now = +new Date();
      return now < timestamp + userLocationTtl ? userLocation : null;
    }

    return null;
  };

  const setUserLocation: (payload: IMapsCoordinates | null) => void = (
    payload,
  ) => {
    const now = +new Date();

    setPosition(userLocationKey, payload);
    setValue(userLocationTimestampKey, now);
  };

  const getMapZoom: () => number | null = () => getNumberValue(mapZoomKey);

  const setMapZoom: (payload: number | null) => void = (payload) =>
    setValue(mapZoomKey, payload);

  return {
    getPosition,
    setPosition,
    getUserLocation,
    setUserLocation,
    getMapZoom,
    setMapZoom,
  };
};

export default LocalStorageService;
