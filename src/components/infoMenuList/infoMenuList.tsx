import React from 'react';

import { IStationDataExtended } from '../../interfaces';
import storeHooks from '../../store/hooks';
import infoMenuListHelpers from './helpers';
import StationStatusBar from '../stationStatusBar/stationStatusBar';

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
        {stationList.sort(infoMenuListHelpers.sortByDistance).map((station) => (
          <li key={station.id} className="flex">
            <button
              type="button"
              className="w-full pt-1 pb-5 text-left"
              onClick={(): void => {
                selectStation(station.id);
              }}
            >
              <StationStatusBar
                stationData={station}
                height={1}
                className="mb-0.5"
              />
              <div className="text-xs font-extralight">{station.name}</div>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default InfoMenuList;
