import React from 'react';

import storeHooks from '../../store/hooks';

import './InfoMenu.css';

const InfoMenu: React.FunctionComponent = () => {
  const { menuShown, stationData } = storeHooks.useStoreState((state) => ({
    menuShown: state.ui.infoMenuShown,
    stationData: state.ui.stationSelectedData,
  }));
  const hideInfoMenu = storeHooks.useStoreActions(
    (actions) => actions.ui.hideInfoMenu,
  );

  const hideMenu: () => void = () => hideInfoMenu();

  const getMenuVisibilityClassName: () => 'shown' | '' = () =>
    menuShown ? 'shown' : '';

  return (
    <div className="InfoMenu-wrapper">
      <div
        className={`InfoMenu-backdrop ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
      />
      <aside className={`InfoMenu ${getMenuVisibilityClassName()}`}>
        {stationData && (
          <div>
            {stationData.name}
            <br />
            {stationData.bikes}: ({stationData.mechanical} +{' '}
            {stationData.electrical})
            <br />
            {stationData.docks}
          </div>
        )}
        {!stationData && <div>No station selected</div>}
      </aside>
    </div>
  );
};

export default InfoMenu;
