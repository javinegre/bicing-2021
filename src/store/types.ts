import { BikeTypeEnum } from '../enums';

export type StationSelectedType = 'all' | number | null;

export type BikeTypeFilterType = {
  [BikeTypeEnum.mechanical]: boolean;
  [BikeTypeEnum.electrical]: boolean;
};
