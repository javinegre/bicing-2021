import React from 'react';

import InfoMenuDetails from '../infoMenuDetails/infoMenuDetails';
import InfoMenuList from '../infoMenuList/infoMenuList';
import Icon from '../ui/icon/icon';
import Spacer from '../ui/spacer/spacer';
import storeHooks from '../../store/hooks';
import { splitStationListByDistance } from './helpers';
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

  const [closestStations, farthestStations] = splitStationListByDistance(
    visibleStations,
    stationData,
  );

  const hideMenu: () => void = () => toggleInfoMenu(false);

  const getMenuVisibilityClassName: () => 'shown' | '' = () =>
    menuShown ? 'shown' : '';

  const showAboutMenu: () => void = () => toggleAboutMenu(true);

  const iconColor = appConfig.infoMenuIconColor;

  return (
    <div className="InfoMenu-wrapper order-1">
      <div
        className={`InfoMenu-backdrop ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
      />
      <aside className={`InfoMenu ${getMenuVisibilityClassName()}`}>
        <InfoMenuDetails />

        <div className="InfoMenu-section--scrollable flex-grow px-4 py-3">
          <InfoMenuList
            title="Closest Stations"
            stationList={closestStations}
          />

          <InfoMenuList title="Other Stations" stationList={farthestStations} />
        </div>

        <div
          className="flex-grow-0 flex items-center px-4 py-3"
          onClick={showAboutMenu}
        >
          <Icon name="info" color={iconColor} />
          <Spacer x={4} />
          Info about this app
        </div>
      </aside>
    </div>
  );
};

export default InfoMenu;
