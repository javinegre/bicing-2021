import { rest } from 'msw';

import appConfig from '../config';
import {
  IXHRStationInfo,
  IXHRStationList,
  IXHRStationStatus,
} from '../services/interfaces';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get(`${appConfig.bicingApiUrl}station-info`, (req, res, ctxt) => {
    const mockedData: IXHRStationList<IXHRStationInfo> = {
      success: true,
      last_updated: +new Date(),
      stations: [],
    };
    return res(ctxt.json(mockedData));
  }),
  rest.get(`${appConfig.bicingApiUrl}station-status`, (req, res, ctxt) => {
    const mockedData: IXHRStationList<IXHRStationStatus> = {
      success: true,
      last_updated: +new Date(),
      stations: [],
    };
    return res(ctxt.json(mockedData));
  }),
];
