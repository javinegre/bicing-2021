import React, { useEffect } from 'react';

import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import useGeoLocation from '../../hooks/useGeoLocation';

const MapControlsLocations: React.FunctionComponent = () => {
  const { setMapCenter, setUserLocation } = storeHooks.useStoreActions(
    (actions) => ({
      setMapCenter: actions.map.setMapCenter,
      setUserLocation: actions.map.setUserLocation,
    }),
  );

  const { geoLocation, geoLocate } = useGeoLocation();

  const updateUserLocation: () => void = () => {
    if (geoLocation) {
      const userLocation = {
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      };
      setMapCenter(userLocation);
      setUserLocation(userLocation);
    }
  };

  useEffect(updateUserLocation, [geoLocation]);

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
