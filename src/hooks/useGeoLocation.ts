import { useState } from 'react';

import { IGeoLocationHook } from './interfaces';

const useGeoLocation: () => IGeoLocationHook = () => {
  const [geoLocation, setGeoLocation] = useState<
    GeolocationPosition | undefined
  >(undefined);
  const [geoLocationError, setGeoLocationError] = useState<
    GeolocationPositionError | undefined
  >(undefined);

  const geoLocationOptions: PositionOptions = {
    timeout: 10000,
    maximumAge: 30000,
  };

  const onError: PositionErrorCallback = (positionError) => {
    setGeoLocation(undefined);
    setGeoLocationError(positionError);
  };

  const geoLocate: () => void = () => {
    navigator.geolocation.getCurrentPosition(
      setGeoLocation,
      onError,
      geoLocationOptions,
    );
  };

  return { geoLocation, geoLocationError, geoLocate };
};

export default useGeoLocation;
