import { IMapsCoordinates } from '../components/map/interfaces';
import { ILocalStorageService } from './interfaces';
import {
  LocalStorageKeyType,
  LocalStorageNumberKeyType,
  LocalStoragePositionKeyType,
} from './types';
import { BikeTypeEnum, StationResourceTypeEnum } from '../enums';
import { BikeTypeFilterType } from '../store/types';

const LocalStorageService: () => ILocalStorageService = () => {
  const userLocationKey = 'userLocation';
  const userLocationTimestampKey = 'userLocationTimestamp';
  const userLocationTtl = 7200000; // 2h
  const mapZoomKey = 'mapZoom';
  const resourceShownKey = 'resourceShown';
  const bikeTypeFilterKey = 'bikeTypeFilter';

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
    key: LocalStorageKeyType,
    payload: IMapsCoordinates | BikeTypeFilterType | number | null,
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

  const getResourceShown: () => StationResourceTypeEnum | null = () => {
    const resourceShown = window.localStorage.getItem(resourceShownKey);
    if (!resourceShown) {
      return null;
    }
    try {
      const parsedResourceShown = JSON.parse(resourceShown);
      return Object.values(StationResourceTypeEnum).includes(
        parsedResourceShown,
      )
        ? parsedResourceShown
        : null;
    } catch {
      return null;
    }
  };

  const setResourceShown: (payload: StationResourceTypeEnum | null) => void = (
    payload,
  ) => {
    setValue(resourceShownKey, payload);
  };

  const getBikeTypeFilter: () => BikeTypeFilterType | null = () => {
    const bikeTypeFilter = window.localStorage.getItem(bikeTypeFilterKey);
    if (!bikeTypeFilter) {
      return null;
    }
    try {
      const parsedBikeTypeFilter = JSON.parse(bikeTypeFilter);
      return BikeTypeEnum.mechanical in parsedBikeTypeFilter &&
        typeof parsedBikeTypeFilter[BikeTypeEnum.mechanical] === 'boolean' &&
        BikeTypeEnum.electrical in parsedBikeTypeFilter &&
        typeof parsedBikeTypeFilter[BikeTypeEnum.electrical] === 'boolean'
        ? parsedBikeTypeFilter
        : null;
    } catch {
      return null;
    }
  };

  const setBikeTypeFilter: (payload: BikeTypeFilterType | null) => void = (
    payload,
  ) => {
    setValue(bikeTypeFilterKey, payload);
  };

  return {
    getPosition,
    setPosition,
    getUserLocation,
    setUserLocation,
    getMapZoom,
    setMapZoom,
    getResourceShown,
    setResourceShown,
    getBikeTypeFilter,
    setBikeTypeFilter,
  };
};

export default LocalStorageService;
