/* eslint-disable no-param-reassign */

import { action } from 'easy-peasy';

import LocalStorageService from '../services/localStorageService';
import { IStoreBookmarkModel } from './interfaces';

const storeBookmarkModel: IStoreBookmarkModel = {
  home: LocalStorageService().getPosition('bookmarkHome'),
  work: LocalStorageService().getPosition('bookmarkWork'),
  favorite: LocalStorageService().getPosition('bookmarkFavorite'),
  setHome: action((state, payload) => {
    state.home = payload;
    LocalStorageService().setPosition('bookmarkHome', payload);
  }),
  setWork: action((state, payload) => {
    state.work = payload;
    LocalStorageService().setPosition('bookmarkWork', payload);
  }),
  setFavorite: action((state, payload) => {
    state.favorite = payload;
    LocalStorageService().setPosition('bookmarkFavorite', payload);
  }),
};

export default storeBookmarkModel;
