import { createStore } from 'easy-peasy';
import { IStoreInitialState, IStoreModel } from '../store/interfaces';
import { IStore } from '../store/types';
import storeModel from '../store/storeModel';
import { ILocalStorageService } from '../services/interfaces';
import { IStoreInitialDataMock } from './interfaces';

const overrideInitialState: (
  defaultInitialState: IStoreInitialState,
  overridingInitialState: IStoreInitialDataMock,
) => IStoreInitialState = (defaultInitialState, overridingInitialState) => ({
  stationList: {
    ...defaultInitialState.stationList,
    ...overridingInitialState.stationList,
  },
  map: {
    ...defaultInitialState.map,
    ...overridingInitialState.map,
  },
  ui: {
    ...defaultInitialState.ui,
    ...overridingInitialState.ui,
  },
  bookmark: {
    ...defaultInitialState.bookmark,
    ...overridingInitialState.bookmark,
  },
});

const getStoreInitialData: (
  defaultInitialDataMock: IStoreInitialState,
  overridingInitialDataMock: IStoreInitialDataMock | undefined,
) => IStoreInitialState = (defaultInitialDataMock, overridingInitialDataMock) =>
  overridingInitialDataMock !== undefined
    ? overrideInitialState(defaultInitialDataMock, overridingInitialDataMock)
    : defaultInitialDataMock;

const mockLocalStorageService: () => Partial<ILocalStorageService> = () => ({
  setResourceShown: jest.fn(() => {}),
  setBikeTypeFilter: jest.fn(() => {}),
});

const getStoreMock: (
  defaultInitialDataMock: IStoreInitialState,
  overridingInitialDataMock: IStoreInitialDataMock | undefined,
) => IStore = (defaultInitialDataMock, overridingInitialDataMock) =>
  createStore<IStoreModel, IStoreInitialState>(storeModel, {
    initialState: getStoreInitialData(
      defaultInitialDataMock,
      overridingInitialDataMock,
    ),
    injections: { LocalStorageService: mockLocalStorageService },
  });

export { overrideInitialState, getStoreMock };
