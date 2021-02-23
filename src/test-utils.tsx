import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';

import { IStoreInitialState, IStoreModel } from './store/interfaces';
import storeModel from './store/storeModel';
import { getStoreInitialState } from './store/helpers';

const mockLocalStorageService = jest.fn(() => {});

const storeMock = createStore<IStoreModel, IStoreInitialState>(storeModel, {
  initialState: getStoreInitialState(),
  injections: { LocalStorageService: mockLocalStorageService },
});

const AllTheProviders: FC = ({ children }) => (
  <StoreProvider store={storeMock}>
    <React.StrictMode>{children}</React.StrictMode>
  </StoreProvider>
);

const customRender: (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => RenderResult = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render, storeMock };
