import React from 'react';

import InfoMenuDetails from '../infoMenuDetails/infoMenuDetails';
import InfoMenuList from '../infoMenuList/infoMenuList';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import infoMenuHelpers from './helpers';
import appConfig from '../../config';

import './InfoMenu.css';

const InfoMenu: React.FunctionComponent = () => {
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
    <div className="InfoMenu-wrapper order-1">
      <div
        className={`InfoMenu-backdrop absolute top-0 bottom-0 left-0 right-0 bg-transparent ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
      />
      <aside
        className={`InfoMenu flex flex-col absolute top-0 bottom-0 left-0 w-full h-full bg-infoMenuBg text-infoMenuColor ${getMenuVisibilityClassName()}`}
      >
        <InfoMenuDetails />

        <div className="flex-grow px-4 py-3 overflow-scroll">
          <InfoMenuList
            title="Closest Stations"
            stationList={closestStations}
          />

          <InfoMenuList title="Other Stations" stationList={farthestStations} />
        </div>

        <div
          className="flex-grow-0 flex-shrink-0 flex items-center h-12 px-4"
          onClick={showAboutMenu}
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
