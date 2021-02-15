import React, { useEffect } from 'react';

import InfoMenu from './components/infoMenu/InfoMenu';
import InfoBox from './components/infoBox/infoBox';
import Map from './components/map/Map';
import AboutMenu from './components/aboutMenu/AboutMenu';
import Notification from './components/ui/notification/Notification';
import storeHooks from './store/hooks';
import { AppFunctionComponent } from './types';

import './App.css';

const App: AppFunctionComponent = () => {
  const fetchStationList = storeHooks.useStoreActions(
    (actions) => actions.stationList.fetch,
  );

  useEffect(() => {
    fetchStationList();
  }, []);

  return (
    <div className="App bg-gray-900 select-none" role="region" aria-label="App">
      <div className="App-wrapper bg-gray-800">
        <main
          className="relative flex flex-col flex-grow order-2"
          role="main"
          aria-label="Main Tile"
        >
          <InfoBox role="banner" aria-label="Info Box" />

          <Map role="region" aria-label="Map Tile" />

          <Notification role="alert" aria-label="Notification" />
        </main>

        <InfoMenu role="region" aria-label="Info Menu Wrapper" />

        <AboutMenu role="region" aria-label="About Menu Wrapper" />
      </div>
    </div>
  );
};

export default App;
