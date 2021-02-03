import React from 'react';

import storeHooks from '../../store/hooks';

import './AboutMenu.css';

const AboutMenu: React.FunctionComponent = () => {
  const menuShown = storeHooks.useStoreState(
    (state) => state.ui.aboutMenuShown,
  );
  const toggleAboutMenu = storeHooks.useStoreActions(
    (actions) => actions.ui.toggleAboutMenu,
  );

  const hideMenu: () => void = () => toggleAboutMenu(false);

  const getMenuVisibilityClassName: () => 'shown' | '' = () =>
    menuShown ? 'shown' : '';

  return (
    <div className="AboutMenu-wrapper order-3">
      <div
        className={`AboutMenu-backdrop ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
      />
      <aside className={`AboutMenu ${getMenuVisibilityClassName()}`}>
        About Menu
      </aside>
    </div>
  );
};

export default AboutMenu;
