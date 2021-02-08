import React from 'react';

import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';

const MapControlsLocations: React.FunctionComponent = () => {
  const { setMapCenter, setUserLocation } = storeHooks.useStoreActions(
    (actions) => ({
      setMapCenter: actions.map.setMapCenter,
      setUserLocation: actions.map.setUserLocation,
    }),
  );

  const updateUserLocation: (position: GeolocationPosition) => void = (
    position,
  ) => {
    const userLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setMapCenter(userLocation);
    setUserLocation(userLocation);
  };

  const geoLocate: () => void = () => {
    const geolocationOptions: PositionOptions = {
      timeout: 10000,
      maximumAge: 30000,
    };

    navigator.geolocation.getCurrentPosition(
      updateUserLocation,
      undefined,
      geolocationOptions,
    );
  };

  return (
    <>
      <Button onClick={geoLocate} color="lightgray" size="lg">
        <Icon name="user-location" color="black" size={24} />
      </Button>

      <Spacer y={6} />

      <Button color="lightgray" size="sm" onClick={(): void => {}}>
        <Icon name="home" color="black" size={16} />
      </Button>

      <Spacer y={6} />

      <Button color="lightgray" size="sm" onClick={(): void => {}}>
        <Icon name="briefcase" color="black" size={16} />
      </Button>

      <Spacer y={6} />

      <Button color="lightgray" size="sm" onClick={(): void => {}}>
        <Icon name="star" color="black" size={16} />
      </Button>
    </>
  );
};

export default MapControlsLocations;
