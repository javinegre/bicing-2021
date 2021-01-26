const express = require('express');
const app = express();

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
    res.redirect(404, 'http://negre.co');
});

module.exports = app;
