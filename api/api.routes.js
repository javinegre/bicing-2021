const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const Api = require('./api.controller');

const apiRoutes = express();

const sendJson = (res, data) => {
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

module.exports = apiRoutes;
