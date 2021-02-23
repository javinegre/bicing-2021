import React from 'react';

import InfoBoxTotals from '../infoBoxTotals/infoBoxTotals';
import InfoBoxTime from '../infoBoxTime/infoBoxTime';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import useAriaProps from '../../hooks/useAriaProps';
import { AppFunctionComponent } from '../../types';

const InfoBox: AppFunctionComponent = (props) => {
  const ariaProps = useAriaProps(props);

  const toggleInfoMenu = storeHooks.useStoreActions(
    (actions) => actions.ui.toggleInfoMenu,
  );

  const showInfoMenu: () => void = () => {
    toggleInfoMenu(true);
  };

  return (
    <div
      className="flex flex-row items-center justify-between px-3 py-2 bg-red-700 text-red-100"
      {...ariaProps}
    >
      <button
        type="button"
        aria-label="Show Station List"
        onClick={showInfoMenu}
        onKeyPress={showInfoMenu}
        tabIndex={0}
      >
        <InfoBoxTotals role="rowgroup" aria-label="Info Box Totals" />
      </button>

      <Spacer x={16} />

      <InfoBoxTime role="cell" aria-label="Info Box Time" />
    </div>
  );
};

export default InfoBox;
