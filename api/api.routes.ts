import { Express, Response } from 'express';

import Api from './api.controller';

import { XHRApiResponseType } from '../src/services/types';
import { IXHRStationInfo, IXHRStationStatus } from '../src/services/interfaces';

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const apiRoutes: Express = express();

const sendJson: (
  res: Response<any, any>,
  data:
    | XHRApiResponseType<IXHRStationInfo | IXHRStationStatus>
    | { latestVersion: string | null },
) => void = (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 0));
};

apiRoutes.get('/station-info', async (req, res) => {
  const resData = await Api().getStationInfo();
  sendJson(res, resData);
});

apiRoutes.get('/station-status', async (req, res) => {
  const resData = await Api().getStationStatus();
  sendJson(res, resData);
});

apiRoutes.get('/latest-version', (req, res) => {
  const appEnv = dotenv.config({
    path: path.join(__dirname, '../.env.production'),
  });

  const resObject = {
    latestVersion: appEnv?.parsed?.REACT_APP_VERSION ?? null,
  };

  sendJson(res, resObject);
});

export default apiRoutes;
