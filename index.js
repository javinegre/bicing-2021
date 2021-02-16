const express = require('express');
const path = require('path');
const cors = require('express-cors');

const Api = require('./api/api.controller');

const app = express();

app.use(
  cors({
    allowedOrigins: ['negre.co'],
  }),
);

app.use(express.static(path.join(__dirname, '/build')));

app.get('/api/v1.1/station-info', async (req, res) => {
  const resData = await Api().getStationInfo();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 0));
});

app.get('/api/v1.1/station-status', async (req, res) => {
  const resData = await Api().getStationStatus();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 0));
});

app.get('*', (req, res) => {
  res.redirect(404, 'http://negre.co');
});

module.exports = app;
