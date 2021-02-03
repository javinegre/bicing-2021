import React from 'react';
import InfoBoxTotals from '../infoBoxTotals/infoBoxTotals';

const InfoBox: React.FunctionComponent = () => {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-2 bg-red-700 text-red-100">
      <InfoBoxTotals />
      Time
    </div>
  );
};

export default InfoBox;
