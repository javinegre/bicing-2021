import React from 'react';
import { render, screen } from './test-utils';
import App from './App';

describe('App Component', () => {
  test('renders all sub-components', () => {
    render(<App />);

    const $app = screen.getByRole('region', { name: 'App' });
    expect($app).toBeInTheDocument();

    const $mainTile = screen.getByRole('main', { name: 'Main Tile' });
    expect($mainTile).toBeInTheDocument();

    const $infoBox = screen.getByRole('rowgroup', { name: 'Info Box' });
    expect($infoBox).toBeInTheDocument();

    const $mapTile = screen.getByRole('region', { name: 'Map Tile' });
    expect($mapTile).toBeInTheDocument();

    const $notification = screen.getByRole('alert', { name: 'Notification' });
    expect($notification).toBeInTheDocument();

    const $infoMenuWrapper = screen.getByRole('region', {
      name: 'Info Menu Wrapper',
    });
    expect($infoMenuWrapper).toBeInTheDocument();

    const $aboutMenuWrapper = screen.getByRole('region', {
      name: 'About Menu Wrapper',
    });
    expect($aboutMenuWrapper).toBeInTheDocument();
  });
});
