import { createTypedHooks } from 'easy-peasy';

import { IStoreModel } from './interfaces';

const {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
} = createTypedHooks<IStoreModel>();

export default {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
};
