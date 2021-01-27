import React from 'react';
import './App.css';
import InfoMenu from './components/infoMenu/InfoMenu';
import Map from './components/map/Map';
import AboutMenu from './components/aboutMenu/AboutMenu';

const App: React.FunctionComponent = () => (
  <main className="App bg-gray-900">
    <div className="App-wrapper bg-gray-800">
      <InfoMenu />
      <Map />
      <AboutMenu />
    </div>
  </main>
);

export default App;
