import axios from 'axios';

import appConfig from '../config';
import {
  IStationService,
  IXHRStationInfo,
  IXHRStationStatus,
  IXHRStationList,
  IXHRErrorResponse,
} from './interfaces';
import { IStationData, IStationList } from '../interfaces';

// stationInfo cache
let stationInfo:
  | IXHRStationList<IXHRStationInfo>
  | IXHRErrorResponse
  | undefined;
let stationInfoLastUpdate = -Infinity;

const StationService: () => IStationService = () => {
  const getEndpointUrl: (endpoint: string) => string = (endpoint) =>
    `${appConfig.bicingApiUrl}${endpoint}`;

  const stationInfoTtl = 3 * 3600 * 1000; // 2h
  const requestTimeout = 10 * 1000; // 10s

  const handleError: (error: Error) => { data: IXHRErrorResponse } = (
    error: Error,
  ) => ({
    data: {
      success: false,
      errorMessage: error?.message,
    } as IXHRErrorResponse,
  });

  const getStationInfo: () => Promise<
    IXHRStationList<IXHRStationInfo> | IXHRErrorResponse
  > = async () => {
    // stationInfo is cached to avoid unnecessary XHR requests
    const now = +new Date();

    if (
      now - stationInfoLastUpdate > stationInfoTtl ||
      stationInfo === undefined ||
      !stationInfo.success
    ) {
      stationInfo = (
        await axios
          .get<IXHRStationList<IXHRStationInfo> | IXHRErrorResponse>(
            getEndpointUrl('station-info'),
            { timeout: requestTimeout },
          )
          .catch(handleError)
      ).data;

      stationInfoLastUpdate = now;
    }

    return stationInfo;
  };

  const getStationStatus: () => Promise<
    IXHRStationList<IXHRStationStatus> | IXHRErrorResponse
  > = async () =>
    (
      await axios
        .get<IXHRStationList<IXHRStationStatus> | IXHRErrorResponse>(
          getEndpointUrl('station-status'),
          { timeout: requestTimeout },
        )
        .catch(handleError)
    ).data;

  const getList: () => Promise<IStationList | null> = async () => {
    const stationInfoPromise = getStationInfo();
    const stationStatusPromise = getStationStatus();

    const stationInfoResult = await stationInfoPromise;
    const stationStatusResult = await stationStatusPromise;

    if (!stationInfoResult.success || !stationStatusResult.success) {
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
