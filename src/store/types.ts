import { EasyPeasyConfig, Store } from 'easy-peasy';
import { IStoreInitialState, IStoreModel } from './interfaces';
import { BikeTypeEnum } from '../enums';

export type StationSelectedType = number | null;

export type BikeTypeFilterType = {
  [BikeTypeEnum.mechanical]: boolean;
  [BikeTypeEnum.electrical]: boolean;
};

export type IStore = Store<
  IStoreModel,
  EasyPeasyConfig<IStoreInitialState, {}>
>;
