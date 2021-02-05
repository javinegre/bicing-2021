import { IStationDataExtended } from '../../interfaces';

const sortByDistance: (
  stationA: IStationDataExtended,
  stationB: IStationDataExtended,
) => number = (stationA, stationB) => stationA.distance - stationB.distance;

export { sortByDistance };
