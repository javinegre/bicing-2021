import React from 'react';
import InfoMenu from './InfoMenu';
import { render, screen } from '../../test-utils';

describe('InfoMenu component', () => {
  test('renders all sub-components', () => {
    render(<InfoMenu />);

    const $dismissBtn = screen.getByRole('button', {
      name: 'Dismiss info menu',
    });
    expect($dismissBtn).toBeInTheDocument();
    expect($dismissBtn).toBeEmptyDOMElement();
    expect($dismissBtn).not.toHaveClass('shown');

    const $infoMenu = screen.getByLabelText('Info Menu');
    expect($infoMenu).toBeInTheDocument();

    const $stationDetails = screen.getByRole('region', {
      name: 'Station details',
    });
    expect($stationDetails).toBeInTheDocument();
    expect($stationDetails).toBeEmptyDOMElement();

    const $closestStationList = screen.queryByLabelText('Closest station list');
    expect($closestStationList).not.toBeInTheDocument();

    const $otherStationList = screen.queryByLabelText('Other station list');
    expect($otherStationList).not.toBeInTheDocument();

    const $openAboutMenuBtn = screen.getByRole('button', {
      name: 'Open about menu',
    });
    expect($openAboutMenuBtn).toBeInTheDocument();
  });
});
