import React from 'react';
import { act, render, screen, waitFor, cleanup } from '../../test-utils';
import InfoBoxTotals from './InfoBoxTotals';
import { BikeTypeEnum } from '../../enums';

describe('InfoBoxTotalsComponent', () => {
  afterEach(cleanup);

  test('renders all figures', () => {
    render(<InfoBoxTotals />);

    const $figures = screen.getAllByLabelText(
      /Total [a-z ]* within nearby area/i,
    );
    expect($figures).toHaveLength(4);
  });

  test('renders initial proper opacity', () => {
    render(<InfoBoxTotals />);

    const $bikesFigure = screen.getByLabelText(
      'Total bikes within nearby area',
    );
    expect($bikesFigure).not.toHaveClass('opacity-20');

    const $mechanicalFigure = screen.getByLabelText(
      'Total mechanical bikes within nearby area',
    );
    expect($mechanicalFigure).not.toHaveClass('opacity-20');

    const $electricFigure = screen.getByLabelText(
      'Total electric bikes within nearby area',
    );
    expect($electricFigure).not.toHaveClass('opacity-20');

    const $docksFigure = screen.getByLabelText(
      'Total docks within nearby area',
    );
    expect($docksFigure).toHaveClass('opacity-20');
  });

  test('renders proper opacity after toggling docks', async () => {
    const { storeMock } = render(<InfoBoxTotals />);

    await act(async () => {
      await storeMock.getActions().ui.toggleResourceShown();
    });

    await waitFor(() => {
      const $bikesFigure = screen.getByLabelText(
        'Total bikes within nearby area',
      );
      expect($bikesFigure).toHaveClass('opacity-20');

      const $mechanicalFigure = screen.getByLabelText(
        'Total mechanical bikes within nearby area',
      );
      expect($mechanicalFigure).toHaveClass('opacity-20');

      const $electricFigure = screen.getByLabelText(
        'Total electric bikes within nearby area',
      );
      expect($electricFigure).toHaveClass('opacity-20');

      const $docksFigure = screen.getByLabelText(
        'Total docks within nearby area',
      );
      expect($docksFigure).not.toHaveClass('opacity-20');
    });
  });

  test('renders proper opacity after disabling mechanical bikes', async () => {
    const { storeMock } = render(<InfoBoxTotals />);

    await act(async () => {
      await storeMock.getActions().ui.toggleBikeType(BikeTypeEnum.mechanical);
    });

    await waitFor(() => {
      const $bikesFigure = screen.getByLabelText(
        'Total bikes within nearby area',
      );
      expect($bikesFigure).toHaveClass('opacity-20');

      const $mechanicalFigure = screen.getByLabelText(
        'Total mechanical bikes within nearby area',
      );
      expect($mechanicalFigure).toHaveClass('opacity-20');

      const $electricFigure = screen.getByLabelText(
        'Total electric bikes within nearby area',
      );
      expect($electricFigure).not.toHaveClass('opacity-20');

      const $docksFigure = screen.getByLabelText(
        'Total docks within nearby area',
      );
      expect($docksFigure).toHaveClass('opacity-20');
    });
  });

  test('renders proper opacity after disabling electric bikes', async () => {
    const { storeMock } = render(<InfoBoxTotals />);

    await act(async () => {
      await storeMock.getActions().ui.toggleBikeType(BikeTypeEnum.electrical);
    });

    await waitFor(() => {
      const $bikesFigure = screen.getByLabelText(
        'Total bikes within nearby area',
      );
      expect($bikesFigure).toHaveClass('opacity-20');

      const $mechanicalFigure = screen.getByLabelText(
        'Total mechanical bikes within nearby area',
      );
      expect($mechanicalFigure).not.toHaveClass('opacity-20');

      const $electricFigure = screen.getByLabelText(
        'Total electric bikes within nearby area',
      );
      expect($electricFigure).toHaveClass('opacity-20');

      const $docksFigure = screen.getByLabelText(
        'Total docks within nearby area',
      );
      expect($docksFigure).toHaveClass('opacity-20');
    });
  });
});
