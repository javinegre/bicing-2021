import React from 'react';
import InfoMenu from './InfoMenu';
import { render, screen, fireEvent, act } from '../../test-utils';
import mapHelpers from '../map/helpers';
import mapHandlerMock from '../../mocks/mapHandler';

describe('InfoMenu component', () => {
  test('renders initial sub-components', () => {
    render(<InfoMenu />);

    const $dismissBtn = screen.getByRole('button', {
      name: 'Dismiss info menu',
    });
    expect($dismissBtn).toBeInTheDocument();
    expect($dismissBtn).toBeEmptyDOMElement();
    expect($dismissBtn).not.toHaveClass('shown');

    const $infoMenu = screen.getByLabelText('Info Menu');
    expect($infoMenu).toBeInTheDocument();
    expect($infoMenu).not.toHaveClass('shown');

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

  test('dismisses menu on backdrop click', () => {
    render(<InfoMenu />, {
      storeInitialDataMock: {
        ui: { infoMenuShown: true },
      },
    });

    const $infoMenu = screen.getByLabelText('Info Menu');

    expect($infoMenu).toBeInTheDocument();
    expect($infoMenu).toHaveClass('shown');

    const $dismissBtn = screen.getByRole('button', {
      name: 'Dismiss info menu',
    });

    fireEvent.click($dismissBtn);

    expect($infoMenu).not.toHaveClass('shown');
  });

  test('renders components after fetching list', async () => {
    const { storeMock } = render(<InfoMenu />);

    await act(async () => {
      await storeMock.getActions().stationList.fetch();

      storeMock
        .getActions()
        .map.setVisibleStations(
          mapHelpers.getVisibleStations(
            storeMock.getState().stationList.stations,
            mapHandlerMock,
          ),
        );
    });

    const $closestStationList = screen.queryByLabelText('Closest station list');
    expect($closestStationList).toBeInTheDocument();

    const $otherStationList = screen.queryByLabelText('Other station list');
    expect($otherStationList).toBeInTheDocument();
  });
});
