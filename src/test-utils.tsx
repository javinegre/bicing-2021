import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';

import { IStoreInitialState, IStoreModel } from './store/interfaces';
import storeModel from './store/storeModel';
import { getStoreInitialState } from './store/helpers';
import { ILocalStorageService } from './services/interfaces';
import { IStore } from './store/types';

const mockLocalStorageService: () => Partial<ILocalStorageService> = () => ({
  setResourceShown: jest.fn(() => {}),
  setBikeTypeFilter: jest.fn(() => {}),
});

const getStoreMock: (initialData: IStoreInitialState) => IStore = (
  initialData,
) =>
  createStore<IStoreModel, IStoreInitialState>(storeModel, {
    initialState: initialData,
    injections: { LocalStorageService: mockLocalStorageService },
  });

const AllTheProviders: (providers: { storeMock: IStore }) => FC = ({
  storeMock,
}) => ({ children }): ReactElement => (
  <StoreProvider store={storeMock}>
    <React.StrictMode>{children}</React.StrictMode>
  </StoreProvider>
);

const customRender: (
  ui: ReactElement,
  providerData?: {
    storeMockInitialData?: IStoreInitialState;
  },
  options?: Omit<RenderOptions, 'queries'>,
) => RenderResult & { storeMock: IStore } = (ui, providerData, options) => {
  const storeMock = getStoreMock(
    providerData?.storeMockInitialData ?? getStoreInitialState(),
  );

  const renderResult = render(ui, {
    wrapper: AllTheProviders({ storeMock }),
    ...options,
  });

  return { ...renderResult, storeMock };
};

export * from '@testing-library/react';

export { customRender as render };
