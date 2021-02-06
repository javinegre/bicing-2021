import React from 'react';

import MapControlsStations from '../mapControlsStations/MapControlsStations';
import MapControlsLocations from '../mapControlsLocations/MapControlsLocations';
import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import storeHooks from '../../store/hooks';

import './MapControls.css';

const MapControls: React.FunctionComponent = () => {
  const fetchStationList = storeHooks.useStoreActions(
    (actions) => actions.stationList.fetch,
  );

  const updateStationList: () => void = () => {
    fetchStationList();
  };

  return (
    <div className="MapControls">
      <div className="MapControls-refresh">
        <Button onClick={updateStationList} color="red" size="lg">
          <Icon name="refresh" color="white" size={24} />
        </Button>
      </div>

      <div className="MapControls-stations">
        <MapControlsStations />
      </div>

      <div className="MapControls-locations">
        <MapControlsLocations />
      </div>
    </div>
  );
};

export default MapControls;
