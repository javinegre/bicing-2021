import React, { useEffect, useRef } from 'react';

import InfoMenuDetails from '../infoMenuDetails/InfoMenuDetails';
import InfoMenuList from '../infoMenuList/infoMenuList';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import useAriaProps from '../../hooks/useAriaProps';
import infoMenuHelpers from './helpers';
import appConfig from '../../config';
import { AppFunctionComponent } from '../../types';

import './InfoMenu.css';

const InfoMenu: AppFunctionComponent = (props) => {
  const ariaProps = useAriaProps(props);

  const $listWrapper = useRef<HTMLDivElement | null>(null);

  const { menuShown, stationData, visibleStations } = storeHooks.useStoreState(
    (state) => ({
      menuShown: state.ui.infoMenuShown,
      stationData: state.map.stationSelectedData,
      visibleStations: state.map.visibleStations,
    }),
  );

  const { toggleInfoMenu, toggleAboutMenu } = storeHooks.useStoreActions(
    (actions) => ({
      toggleInfoMenu: actions.ui.toggleInfoMenu,
      toggleAboutMenu: actions.ui.toggleAboutMenu,
    }),
  );

  useEffect(() => {
    if ($listWrapper.current?.scrollTop) {
      // Reset scroll when data changes
      $listWrapper.current.scrollTop = 0;
    }
  }, [visibleStations, stationData]);

  const [
    closestStations,
    farthestStations,
  ] = infoMenuHelpers.splitStationListByDistance(visibleStations, stationData);

  const hideMenu: () => void = () => toggleInfoMenu(false);

  const getMenuVisibilityClassName: () => 'shown' | '' = () =>
    menuShown ? 'shown' : '';

  const showAboutMenu: () => void = () => toggleAboutMenu(true);

  const iconColor = appConfig.infoMenuIconColor;

  return (
    <div className="InfoMenu-wrapper order-1" {...ariaProps}>
      <div
        className={`InfoMenu-backdrop absolute top-0 bottom-0 left-0 right-0 bg-transparent ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
        onKeyPress={hideMenu}
        role="button"
        aria-label="Dismiss info menu"
        tabIndex={0}
      />
      <aside
        className={`InfoMenu flex flex-col absolute top-0 bottom-0 left-0 w-full h-full bg-infoMenuBg text-infoMenuColor ${getMenuVisibilityClassName()}`}
        aria-label="Info Menu"
      >
        <InfoMenuDetails role="region" aria-label="Station details" />

        <div ref={$listWrapper} className="flex-grow py-2 overflow-scroll">
          {closestStations.length > 0 && (
            <InfoMenuList
              title="Closest stations"
              stationList={closestStations}
              aria-label="Closest station list"
            />
          )}

          {farthestStations.length > 0 && (
            <InfoMenuList
              title="Other stations"
              stationList={farthestStations}
              aria-label="Other station list"
            />
          )}
        </div>

        <div
          className="flex-grow-0 flex-shrink-0 flex items-center h-12 px-4"
          onClick={showAboutMenu}
          onKeyPress={showAboutMenu}
          role="button"
          aria-label="Open about menu"
          tabIndex={0}
        >
          <Icon name="info" color={iconColor} size={28} />
          <Spacer x={8} />
          <p className="text-gray-500">Info about this App</p>
        </div>
      </aside>
    </div>
  );
};

export default InfoMenu;
