import React from 'react';

import MapControlsStations from '../mapControlsStations/MapControlsStations';
import MapControlsLocations from '../mapControlsLocations/MapControlsLocations';
import Button from '../ui/button/Button';
import Icon from '../ui/icon/icon';
import storeHooks from '../../store/hooks';
import { AppFunctionComponent } from '../../types';
import useAriaProps from '../../hooks/useAriaProps';

import './MapControls.css';

const MapControls: AppFunctionComponent = (props) => {
  const ariaProps = useAriaProps(props);

  const fetchStationList = storeHooks.useStoreActions(
    (actions) => actions.stationList.fetch,
  );

  const updateStationList: () => void = () => {
    fetchStationList();
  };

  return (
    <div className="MapControls" {...ariaProps}>
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
