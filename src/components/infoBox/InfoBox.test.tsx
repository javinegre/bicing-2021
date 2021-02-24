import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import InfoBox from './InfoBox';

describe('InfoBox component', () => {
  test('renders sub-components', () => {
    render(<InfoBox />);

    const $button = screen.getByRole('button', { name: 'Show Station List' });
    expect($button).toBeInTheDocument();

    const $totals = screen.getByRole('rowgroup', { name: 'Info Box Totals' });
    expect($totals).toBeInTheDocument();

    const $time = screen.getByRole('cell', { name: 'Info Box Time' });
    expect($time).toBeInTheDocument();
  });

  test('button opens InfoMenu', () => {
    const { storeMock } = render(<InfoBox />);

    expect(storeMock.getState().ui.infoMenuShown).toBe(false);

    const $button = screen.getByRole('button', { name: 'Show Station List' });

    fireEvent.click($button);

    expect(storeMock.getState().ui.infoMenuShown).toBe(true);
  });
});
