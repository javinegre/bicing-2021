import React from 'react';
import { render, screen } from '../../test-utils';
import InfoBox from './InfoBox';

describe('InfoBox component', () => {
  test('renders totals', () => {
    render(<InfoBox />);

    const $totals = screen.getByRole('rowgroup', { name: 'Info Box Totals' });

    expect($totals).toBeInTheDocument();
  });

  xtest('renders last update time', async () => {});
});
