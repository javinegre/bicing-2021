import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import storeModel from './store/storeModel';

const AllTheProviders: FC = ({ children }) => (
  <StoreProvider store={storeModel}>
    <React.StrictMode>{children}</React.StrictMode>
  </StoreProvider>
);

const customRender: (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => RenderResult = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
