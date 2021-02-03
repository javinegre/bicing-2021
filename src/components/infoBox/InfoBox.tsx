import React from 'react';

import storeHooks from '../../store/hooks';
import Icon from '../ui/icon/icon';
import infoBoxHelpers from './helpers';

const InfoBox: React.FunctionComponent = () => {
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
    <div className="flex flex-row items-center px-4 py-2 bg-red-700 text-red-100">
      <div {...getNumberBlockStyle(isBikesNumberHighlighted)}>
        <span className="text-xl font-bold">{totals.bikes}</span>
        <Icon name="bike" color={iconColor} />
      </div>

      <div {...getNumberBlockStyle(isMechanicalBikesNumberHighlighted)}>
        {totals.mechanical}
        <Icon name="gears" color={iconColor} size={12} />
      </div>

      <div {...getNumberBlockStyle(isElectricalBikesNumberHighlighted)}>
        {totals.electrical}
        <Icon name="bolt" color={iconColor} size={12} />
      </div>

      <div {...getNumberBlockStyle(isDocksNumberHighlighted)}>
        <span className="text-xl font-bold">{totals.docks}</span>
        <Icon name="parking" color={iconColor} />
      </div>
    </div>
  );
};

export default InfoBox;
