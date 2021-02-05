import React from 'react';

import { IStationDataExtended } from '../../interfaces';
import storeHooks from '../../store/hooks';
import { sortByDistance } from './helpers';
import StationStatusBar from '../../stationStatusBar/stationStatusBar';

export interface IInfoMenuListProps {
  title: string;
  stationList: IStationDataExtended[];
}

const InfoMenuList: React.FunctionComponent<IInfoMenuListProps> = (props) => {
  const { title, stationList } = props;

  const selectStation = storeHooks.useStoreActions(
    (actions) => actions.map.selectStation,
  );

  return (
    <>
      <div className="pb-4 font-light">{title}</div>
      <ul>
        {stationList.sort(sortByDistance).map((station) => (
          <li
            key={station.id}
            className="pb-6"
            onClick={(): void => {
              selectStation(station.id);
            }}
          >
            <StationStatusBar stationData={station} height={1} />
            <div className="text-xs font-extralight">{station.name}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default InfoMenuList;
