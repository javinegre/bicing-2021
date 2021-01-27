const express = require('express');
const path = require('path');

const Api = require('./api/api.controller');

const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.get('/api/v1.0/station-info', async (req, res) => {
  const resData = await Api().getStationInfo();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 0));
});

app.get('/api/v1.0/station-status', async (req, res) => {
  const resData = await Api().getStationStatus();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 0));
});

app.get('*', (req, res) => {
  res.redirect(404, 'http://negre.co');
});

module.exports = app;
