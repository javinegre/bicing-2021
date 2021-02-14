import React from 'react';

import InfoBoxTotals from '../infoBoxTotals/infoBoxTotals';
import InfoBoxTime from '../infoBoxTime/infoBoxTime';
import Spacer from '../ui/spacer/spacer';
import { AppFunctionComponent } from '../../types';

const InfoBox: AppFunctionComponent = () => (
  <div className="flex flex-row items-center justify-between px-3 py-2 bg-red-700 text-red-100">
    <InfoBoxTotals />
    <Spacer x={16} />
    <InfoBoxTime />
  </div>
);

export default InfoBox;
