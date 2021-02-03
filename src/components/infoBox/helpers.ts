import { IStationDataExtended } from '../../interfaces';
import { INumbersHighlighting, IStationTotals } from './interfaces';
import { BikeTypeFilterType } from '../../store/types';
import { BikeTypeEnum, StationResourceTypeEnum } from '../../enums';

const isInNearbyArea: (station: IStationDataExtended) => boolean = (station) =>
  station.inNearbyArea;

const calculateTotals: (
  nearbyStations: IStationDataExtended[],
) => IStationTotals = (nearbyStations) =>
  nearbyStations.reduce<IStationTotals>(
    (totalsSum, station) => ({
      bikes: totalsSum.bikes + station.bikes,
      electrical: totalsSum.electrical + station.electrical,
      mechanical: totalsSum.mechanical + station.mechanical,
      docks: totalsSum.docks + station.docks,
    }),
    { bikes: 0, electrical: 0, mechanical: 0, docks: 0 },
  );

const getNumbersHighlighting: (
  resourceShown: StationResourceTypeEnum,
  bikeTypeFilter: BikeTypeFilterType,
) => INumbersHighlighting = (resourceShown, bikeTypeFilter) => {
  const isBikesNumberHighlighted =
    resourceShown === StationResourceTypeEnum.bikes &&
    bikeTypeFilter[BikeTypeEnum.electrical] &&
    bikeTypeFilter[BikeTypeEnum.mechanical];

  const isElectricalBikesNumberHighlighted =
    resourceShown === StationResourceTypeEnum.bikes &&
    bikeTypeFilter[BikeTypeEnum.electrical];

  const isMechanicalBikesNumberHighlighted =
    resourceShown === StationResourceTypeEnum.bikes &&
    bikeTypeFilter[BikeTypeEnum.mechanical];

  const isDocksNumberHighlighted =
    resourceShown === StationResourceTypeEnum.docks;

  return {
    isBikesNumberHighlighted,
    isElectricalBikesNumberHighlighted,
    isMechanicalBikesNumberHighlighted,
    isDocksNumberHighlighted,
  };
};

export default {
  isInNearbyArea,
  calculateTotals,
  getNumbersHighlighting,
};
