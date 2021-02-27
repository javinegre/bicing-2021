import React from 'react';

import storeHooks from '../../store/hooks';
import mapConfig from './config';
import { ReactComponent as CrossHairIcon } from '../../assets/icons/hints/crosshair.svg';
import { AppFunctionComponent } from '../../types';

const MapHints: AppFunctionComponent = () => {
  const mapZoom = storeHooks.useStoreState((state) => state.map.mapZoom);

  const nearbyAreaDiameter: number | undefined =
    mapConfig.nearbyAreaHintConfig[mapZoom];

  return (
    <div className="Map-hints">
      <CrossHairIcon className="Map-hints-item" />
      {nearbyAreaDiameter && (
        <svg
          className="Map-hints-item"
          xmlns="http://www.w3.org/2000/svg"
          width={nearbyAreaDiameter}
          height={nearbyAreaDiameter}
          viewBox={`0 0 ${nearbyAreaDiameter} ${nearbyAreaDiameter}`}
          fill="#000000"
        >
          <circle
            cx={nearbyAreaDiameter / 2}
            cy={nearbyAreaDiameter / 2}
            r={nearbyAreaDiameter / 2 - 1}
            stroke="#406090"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            strokeDasharray="5"
          />
        </svg>
      )}
    </div>
  );
};

export default MapHints;
