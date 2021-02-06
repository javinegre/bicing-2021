import React from 'react';

import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import { BikeTypeEnum, StationResourceTypeEnum } from '../../enums';

const MapControlsStations: React.FunctionComponent = () => {
  const { resourceShown, bikeTypeFilter } = storeHooks.useStoreState(
    (state) => ({
      resourceShown: state.ui.resourceShown,
      bikeTypeFilter: state.ui.bikeTypeFilter,
    }),
  );

  const { toggleResourceShown, toggleBikeType } = storeHooks.useStoreActions(
    (actions) => ({
      toggleResourceShown: actions.ui.toggleResourceShown,
      toggleBikeType: actions.ui.toggleBikeType,
    }),
  );

  const toggleResourceType: () => void = () => toggleResourceShown();

  const toggleBikeTypeTo: (bikeType: BikeTypeEnum) => () => void = (
    bikeType,
  ) => (): void => {
    toggleBikeType(bikeType);
  };

  return (
    <>
      <Button onClick={toggleResourceType}>
        {resourceShown === StationResourceTypeEnum.bikes ? (
          <Icon name="parking" color="white" />
        ) : (
          <Icon name="bike" color="white" size={24} />
        )}
      </Button>

      <Spacer x={6} />

      <Button
        onClick={toggleBikeTypeTo(BikeTypeEnum.electrical)}
        disabled={!bikeTypeFilter[BikeTypeEnum.electrical]}
      >
        <Icon name="bolt" color="white" />
      </Button>

      <Spacer x={6} />

      <Button
        onClick={toggleBikeTypeTo(BikeTypeEnum.mechanical)}
        disabled={!bikeTypeFilter[BikeTypeEnum.mechanical]}
      >
        <Icon name="gears" color="white" />
      </Button>
    </>
  );
};

export default MapControlsStations;
