import axios from 'axios';

import {
  IStationService,
  IXHRStationInfoList,
  IXHRStationStatusList,
} from './interfaces';
import { IStationData, IStationList } from '../interfaces';
import appConfig from '../config';

const StationService: () => IStationService = () => {
  const getEndpointUrl: (endpoint: string) => string = (endpoint) =>
    `${appConfig.bicingApiUrl}${endpoint}`;

  // stationInfo cache
  let stationInfo: IXHRStationInfoList | null = null;
  let stationInfoLastUpdate = -Infinity;
  const stationInfoTtl = 3 * 3600 * 1000; // 2h

  const getStationInfo: () => Promise<IXHRStationInfoList | null> = async () => {
    // stationInfo is cached to avoid unnecessary XHR requests
    const now = +new Date();
    if (now - stationInfoLastUpdate > stationInfoTtl || stationInfo === null) {
      stationInfo = (
        await axios.get<IXHRStationInfoList>(getEndpointUrl('station-info'))
      ).data;
      stationInfoLastUpdate = now;
    }

    return stationInfo;
  };

  const getStationStatus: () => Promise<IXHRStationStatusList> = async () =>
    (await axios.get<IXHRStationStatusList>(getEndpointUrl('station-status')))
      .data;

  const getList: () => Promise<IStationList | null> = async () => {
    const stationInfoPromise = getStationInfo();
    const stationStatusPromise = getStationStatus();

    const stationInfoResult = await stationInfoPromise;
    const stationStatusResult = await stationStatusPromise;

    if (stationInfoResult === null || stationStatusResult === null) {
      return null;
    }

    const stationList: IStationData[] = stationInfoResult.stations.map(
      (station) => {
        const newStationStatus = stationStatusResult.stations.find(
          (stationStatus) => stationStatus.i === station.id,
        );

        return {
          ...station,
          bikes: newStationStatus ? newStationStatus.m + newStationStatus.e : 0,
          docks: newStationStatus?.d ?? 0,
          mechanical: newStationStatus?.m ?? 0,
          electrical: newStationStatus?.e ?? 0,
          status: newStationStatus?.s ?? 0,
        };
      },
    );

    return {
      updateTime: stationStatusResult.last_updated * 1000,
      stations: stationList,
    };
  };

  return {
    getList,
  };
};

export default StationService;
