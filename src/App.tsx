import React, { useEffect } from 'react';

import InfoMenu from './components/infoMenu/InfoMenu';
import Map from './components/map/Map';
import AboutMenu from './components/aboutMenu/AboutMenu';
import storeHooks from './store/hooks';

import './App.css';

const App: React.FunctionComponent = () => {
  const fetchStationList = storeHooks.useStoreActions(
    (actions) => actions.stationList.fetch,
  );

  useEffect(() => {
    fetchStationList();
  }, []);

  return (
    <main className="App bg-gray-900">
      <div className="App-wrapper bg-gray-800">
        <Map />
        <InfoMenu />
        <AboutMenu />
      </div>
    </main>
  );
};

export default App;
