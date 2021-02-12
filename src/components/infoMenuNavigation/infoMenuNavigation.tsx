import React from 'react';

import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import infoMenuNavigationHelpers from './helpers';
import storeHooks from '../../store/hooks';

const InfoMenuNavigation: React.FunctionComponent = () => {
  const { stationData, resourceShown } = storeHooks.useStoreState((state) => ({
    stationData: state.map.stationSelectedData,
    resourceShown: state.ui.resourceShown,
  }));

  const buttonClassName =
    'flex rounded-full items-center px-1.5 py-1 bg-infoMenuBg-light hover:bg-infoMenuBg-dark';
  const buttonTextClassName =
    'text-gray-400 text-xs font-light whitespace-nowrap';
  const iconColor = '#808080';

  return stationData ? (
    <div className="flex flex-wrap">
      <a
        className={buttonClassName}
        href={infoMenuNavigationHelpers.getDirectionsUrl(
          stationData,
          resourceShown,
        )}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="route" color={iconColor} size={16} />

        <Spacer x={2} />

        <span className={buttonTextClassName}>Get directions</span>
      </a>

      <Spacer x={6} />

      <a
        className={buttonClassName}
        href={infoMenuNavigationHelpers.getStreetViewUrl(stationData)}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="street-view" color={iconColor} size={16} />

        <Spacer x={2} />

        <span className={buttonTextClassName}>Street View</span>
      </a>
    </div>
  ) : (
    <></>
  );
};

export default InfoMenuNavigation;
