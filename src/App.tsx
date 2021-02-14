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
    <main className="App bg-gray-900 select-none">
      <div className="App-wrapper bg-gray-800">
        <section className="relative flex flex-col flex-grow order-2">
          <InfoBox />

          <Map />

          <Notification />
        </section>

        <InfoMenu />

        <AboutMenu />
      </div>
    </main>
  );
};

export default App;
