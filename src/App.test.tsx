import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { render, screen } from '@testing-library/react';
import App from './App';
import storeModel from './store/storeModel';

describe('App Component', () => {
  test('renders all sub-components', () => {
    render(
      <StoreProvider store={storeModel}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StoreProvider>,
    );

    const $app = screen.getByRole('region', { name: 'App' });
    const $mainTile = screen.getByRole('main', { name: 'Main Tile' });
    const $infoBox = screen.getByRole('banner', { name: 'Info Box' });
    const $mapTile = screen.getByRole('region', { name: 'Map Tile' });
    const $notification = screen.getByRole('alert', { name: 'Notification' });
    const $infoMenuWrapper = screen.getByRole('region', {
      name: 'Info Menu Wrapper',
    });
    const $aboutMenuWrapper = screen.getByRole('region', {
      name: 'About Menu Wrapper',
    });

    expect($app).toBeInTheDocument();
    expect($mainTile).toBeInTheDocument();
    expect($infoBox).toBeInTheDocument();
    expect($mapTile).toBeInTheDocument();
    expect($notification).toBeInTheDocument();
    expect($infoMenuWrapper).toBeInTheDocument();
    expect($aboutMenuWrapper).toBeInTheDocument();
  });
});
