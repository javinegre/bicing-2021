import { Express } from 'express';

const express = require('express');
const path = require('path');

const app: Express = express();

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.redirect(404, 'http://negre.co');
});

module.exports = app;
