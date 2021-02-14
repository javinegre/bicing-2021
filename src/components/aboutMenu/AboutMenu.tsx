import React from 'react';

import storeHooks from '../../store/hooks';
import Spacer from '../ui/spacer/spacer';
import { AppFunctionComponent } from '../../types';

import './AboutMenu.css';

import { ReactComponent as JaviNegreCodesLogo } from '../../assets/images/javi-negre-codes.svg';
import { ReactComponent as GithubLogo } from '../../assets/icons/misc/github.svg';

const { default: bicingAppLogo } = require('../../assets/images/logo192.png');

const AboutMenu: AppFunctionComponent = () => {
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
        className={`AboutMenu-backdrop absolute top-0 bottom-0 left-0 right-0 bg-gray-900 ${getMenuVisibilityClassName()}`}
        onClick={hideMenu}
        onKeyPress={hideMenu}
        role="button"
        aria-label="Dismiss"
        tabIndex={0}
      />
      <aside
        className={`AboutMenu absolute top-0 bottom-0 right-0 px-4 py-4 bg-gray-100 text-gray-700 ${getMenuVisibilityClassName()}`}
      >
        <div className="flex items-center">
          <img
            src={bicingAppLogo}
            alt="Bicing App Logo"
            className="w-16 h-16"
          />
          <Spacer x={8} />
          <h1 className="text-3xl font-bold">Bicing App</h1>
        </div>
        <hr className="my-4" />
        <div>
          <p className="text-sm">This project was made with ❤ by:</p>

          <a href="https://negre.co" target="_blank" rel="noreferrer">
            <JaviNegreCodesLogo className="w-56" />
          </a>

          <div className="flex items-center">
            <GithubLogo className="w-4 h-4" />
            <Spacer x={4} />

            <a
              href="https://github.com/javinegre/bicing-2021"
              target="_blank"
              rel="noreferrer"
            >
              Source code
            </a>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-gray-500 text-xs">
          v
          <span className="font-mono font-bold ">
            {process.env.REACT_APP_VERSION ?? 'dev'}
          </span>
        </div>
      </aside>
      <div className="bg-gray-100" />
    </div>
  );
};

export default AboutMenu;
