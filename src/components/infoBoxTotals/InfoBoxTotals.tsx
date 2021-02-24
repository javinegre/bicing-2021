import React from 'react';

import storeHooks from '../../store/hooks';
import useAriaProps from '../../hooks/useAriaProps';
import Spacer from '../ui/spacer/spacer';
import Icon from '../ui/icon/icon';
import infoBoxHelpers from './helpers';
import { AppFunctionComponent } from '../../types';

const InfoBoxTotals: AppFunctionComponent = (props) => {
  const ariaProps = useAriaProps(props);

  const {
    visibleStations,
    resourceShown,
    bikeTypeFilter,
  } = storeHooks.useStoreState((state) => ({
    visibleStations: state.map.visibleStations,
    resourceShown: state.ui.resourceShown,
    bikeTypeFilter: state.ui.bikeTypeFilter,
  }));

  const {
    isInNearbyArea,
    calculateTotals,
    getNumbersHighlighting,
  } = infoBoxHelpers;

  const nearbyStations = visibleStations.filter(isInNearbyArea);
  const totals = calculateTotals(nearbyStations);

  const {
    isBikesNumberHighlighted,
    isMechanicalBikesNumberHighlighted,
    isElectricalBikesNumberHighlighted,
    isDocksNumberHighlighted,
  } = getNumbersHighlighting(resourceShown, bikeTypeFilter);

  const iconColor = '#601818';

  const getNumberBlockClassNames: (
    isHighlighted: boolean,
  ) => React.HTMLAttributes<HTMLDivElement> = (isHighlighted) => ({
    className: `flex flex-row items-center ${
      isHighlighted ? '' : 'opacity-20'
    }`,
  });

  return (
    <div className="flex flex-row items-center" {...ariaProps}>
      <div
        {...getNumberBlockClassNames(isBikesNumberHighlighted)}
        aria-label="Total bikes within nearby area"
      >
        <Icon name="bike" color={iconColor} />
        <Spacer x={4} />
        <span className="text-xl font-bold">{totals.bikes}</span>
      </div>

      <Spacer x={8} />

      <div
        {...getNumberBlockClassNames(isMechanicalBikesNumberHighlighted)}
        aria-label="Total mechanical bikes within nearby area"
      >
        <Icon name="gears" color={iconColor} size={12} />
        <Spacer x={4} />
        <span>{totals.mechanical}</span>
      </div>

      <Spacer x={4} />

      <div
        {...getNumberBlockClassNames(isElectricalBikesNumberHighlighted)}
        aria-label="Total electric bikes within nearby area"
      >
        <Icon name="bolt" color={iconColor} size={12} />
        <span>{totals.electrical}</span>
      </div>

      <Spacer x={12} />

      <div
        {...getNumberBlockClassNames(isDocksNumberHighlighted)}
        aria-label="Total docks within nearby area"
      >
        <Icon name="parking" color={iconColor} size={18} />
        <span className="text-xl font-bold">{totals.docks}</span>
      </div>
    </div>
  );
};

export default InfoBoxTotals;
