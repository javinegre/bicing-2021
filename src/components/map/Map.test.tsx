import React from 'react';
import { render, screen } from '../../test-utils';
import Map from './Map';

describe('Map component', () => {
  test('renders all sub-components', () => {
    render(<Map />);

    const $map = screen.getByRole('application', { name: 'Interactive map' });
    expect($map).toBeInTheDocument();

    const $mapHints = screen.getByTestId('map-location-hints');
    expect($mapHints).toBeInTheDocument();

    const $mapControls = screen.getByRole('group', { name: 'Map controls' });
    expect($mapControls).toBeInTheDocument();
  });
});
