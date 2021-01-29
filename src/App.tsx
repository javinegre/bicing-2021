import React, { useEffect, useState } from 'react';
import './App.css';
import InfoMenu from './components/infoMenu/InfoMenu';
import Map from './components/map/Map';
import AboutMenu from './components/aboutMenu/AboutMenu';
import StationService from './services/stationService';
import { IStationList } from './interfaces';

const App: React.FunctionComponent = () => {
  const [stationList, setStationList] = useState<IStationList | null>(null);

  const getStationList: () => void = () => {
    StationService().getList().then(setStationList);
  };

  useEffect(getStationList, []);

  return (
    <main className="App bg-gray-900">
      <div className="App-wrapper bg-gray-800">
        <InfoMenu />
        <Map stationList={stationList} updateStationList={getStationList} />
        <AboutMenu />
      </div>
    </main>
  );
};

export default App;
