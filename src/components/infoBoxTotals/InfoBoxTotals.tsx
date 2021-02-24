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
  const highlightedNumberOpacity = 1;
  const dimmedNumberOpacity = 0.2;

  const getNumberBlockStyle: (
    isHighlighted: boolean,
  ) => React.HTMLAttributes<HTMLDivElement> = (isHighlighted) => ({
    className: 'flex flex-row items-center',
    style: {
      opacity: isHighlighted ? highlightedNumberOpacity : dimmedNumberOpacity,
    },
  });

  return (
    <div className="flex flex-row items-center" {...ariaProps}>
      <div {...getNumberBlockStyle(isBikesNumberHighlighted)}>
        <Icon name="bike" color={iconColor} />
        <Spacer x={4} />
        <span className="text-xl font-bold">{totals.bikes}</span>
      </div>

      <Spacer x={8} />

      <div {...getNumberBlockStyle(isMechanicalBikesNumberHighlighted)}>
        <Icon name="gears" color={iconColor} size={12} />
        <Spacer x={4} />
        {totals.mechanical}
      </div>

      <Spacer x={4} />

      <div {...getNumberBlockStyle(isElectricalBikesNumberHighlighted)}>
        <Icon name="bolt" color={iconColor} size={12} />
        {totals.electrical}
      </div>

      <Spacer x={12} />

      <div {...getNumberBlockStyle(isDocksNumberHighlighted)}>
        <Icon name="parking" color={iconColor} size={18} />
        <span className="text-xl font-bold">{totals.docks}</span>
      </div>
    </div>
  );
};

export default InfoBoxTotals;
