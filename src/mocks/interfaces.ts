import {
  IStoreBookmarkInitialState,
  IStoreMapInitialState,
  IStoreStationListInitialState,
  IStoreUiInitialState,
} from '../store/interfaces';

export interface IStoreInitialDataMock {
  stationList?: Partial<IStoreStationListInitialState>;
  map?: Partial<IStoreMapInitialState>;
  ui?: Partial<IStoreUiInitialState>;
  bookmark?: Partial<IStoreBookmarkInitialState>;
}
