import React from 'react';

import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import { BikeTypeEnum, StationResourceTypeEnum } from '../../enums';
import Toggle from '../ui/toggle/Toggle';
import { IToggleOptions } from '../ui/toggle/interfaces';
import { AppFunctionComponent } from '../../types';

const MapControlsStations: AppFunctionComponent = () => {
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

  const toggleElementOptions: IToggleOptions<StationResourceTypeEnum> = [
    {
      value: StationResourceTypeEnum.bikes,
      icon: <Icon name="bike" color="white" size={24} />,
    },
    {
      value: StationResourceTypeEnum.docks,
      icon: <Icon name="parking" color="white" size={22} />,
    },
  ];

  return (
    <>
      <Button
        onClick={toggleBikeTypeTo(BikeTypeEnum.electrical)}
        status={bikeTypeFilter[BikeTypeEnum.electrical] ? 'on' : 'off'}
        disabled={resourceShown === StationResourceTypeEnum.docks}
      >
        <Icon name="bolt" color="white" />
      </Button>

      <Spacer x={6} />

      <Button
        onClick={toggleBikeTypeTo(BikeTypeEnum.mechanical)}
        status={bikeTypeFilter[BikeTypeEnum.mechanical] ? 'on' : 'off'}
        disabled={resourceShown === StationResourceTypeEnum.docks}
      >
        <Icon name="gears" color="white" />
      </Button>

      <Spacer x={6} />

      <Toggle
        selectedValue={resourceShown}
        options={toggleElementOptions}
        onToggle={toggleResourceType}
        size="lg"
      />
    </>
  );
};

export default MapControlsStations;
