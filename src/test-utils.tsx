import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';

import { IStore } from './store/types';
import { IStoreInitialDataMock } from './mocks/interfaces';
import { getStoreMock } from './mocks/store';

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
    storeInitialDataMock?: IStoreInitialDataMock;
  },
  options?: Omit<RenderOptions, 'queries'>,
) => RenderResult & { storeMock: IStore } = (ui, providerData, options) => {
  const storeMock = getStoreMock(providerData?.storeInitialDataMock);

  const renderResult = render(ui, {
    wrapper: AllTheProviders({ storeMock }),
    ...options,
  });

  return { ...renderResult, storeMock };
};

export * from '@testing-library/react';

export { customRender as render };
