import { createStore } from 'easy-peasy';
import { IStoreInitialState, IStoreModel } from './interfaces';
import storeModel from './storeModel';
import { getStoreInitialState } from './helpers';
import LocalStorageService from '../services/localStorageService';

const store = createStore<IStoreModel, IStoreInitialState>(storeModel, {
  initialState: getStoreInitialState(),
  injections: { LocalStorageService },
});

export default store;
