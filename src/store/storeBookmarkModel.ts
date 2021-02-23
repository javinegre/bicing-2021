/* eslint-disable no-param-reassign */

import { action, thunk } from 'easy-peasy';

import { IStoreBookmarkModel } from './interfaces';

const storeBookmarkModel: IStoreBookmarkModel = {
  home: null,
  work: null,
  favorite: null,
  updateHomeState: action((state, payload) => {
    state.home = payload;
  }),
  setHome: thunk(
    (actions, payload, { injections: { LocalStorageService } }) => {
      actions.updateHomeState(payload);
      LocalStorageService().setPosition('bookmarkHome', payload);
    },
  ),
  updateWorkState: action((state, payload) => {
    state.work = payload;
  }),
  setWork: thunk(
    (actions, payload, { injections: { LocalStorageService } }) => {
      actions.updateWorkState(payload);
      LocalStorageService().setPosition('bookmarkWork', payload);
    },
  ),
  updateFavoriteState: action((state, payload) => {
    state.favorite = payload;
  }),
  setFavorite: thunk(
    (actions, payload, { injections: { LocalStorageService } }) => {
      actions.updateFavoriteState(payload);
      LocalStorageService().setPosition('bookmarkFavorite', payload);
    },
  ),
};

export default storeBookmarkModel;
