import React from 'react';

import StationStatusBar from '../stationStatusBar/stationStatusBar';
import infoMenuListHelpers from './helpers';
import storeHooks from '../../store/hooks';
import { IStationDataExtended } from '../../interfaces';
import { IInfoMenuListProps } from './interfaces';
import { AppFunctionComponent } from '../../types';

const InfoMenuList: AppFunctionComponent<IInfoMenuListProps> = (props) => {
  const { title, stationList } = props;

  const selectStation = storeHooks.useStoreActions(
    (actions) => actions.map.selectStation,
  );

  const isOperating: (station: IStationDataExtended) => boolean = (station) =>
    station?.status === 1;

  return (
    <>
      <div className="flex items-center px-4 py-1 mb-4 text-sm font-light bg-infoMenuBg-light text-gray-400">
        {title}
      </div>
      <ul className="px-4">
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
                className={`mb-0.5 ${
                  !isOperating(station) ? 'opacity-30' : ''
                }`}
              />
              <div
                className={`text-xs font-extralight ${
                  !isOperating(station) ? 'line-through' : ''
                }`}
              >
                {station.name}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default InfoMenuList;
