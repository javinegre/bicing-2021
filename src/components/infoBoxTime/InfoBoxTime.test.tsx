import React from 'react';
import { act, render, screen, waitFor } from '../../test-utils';
import InfoBoxTime from './InfoBoxTime';

describe('InfoBoxTime', () => {
  test('initially hidden, render after list fetch', async () => {
    const { storeMock } = render(<InfoBoxTime />);

    const $hiddenLastUpdateTime = screen.queryByLabelText('Last update time');
    expect($hiddenLastUpdateTime).not.toBeInTheDocument();

    await act(async () => {
      await storeMock.getActions().stationList.fetch();
    });

    await waitFor(() => {
      const $lastUpdateTime = screen.getByLabelText('Last update time');
      expect($lastUpdateTime).toBeInTheDocument();
    });
  });
});
