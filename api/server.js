const express = require('express');

const configureMiddleware = require('../modules/middlewares.js');

const server = express();
configureMiddleware(server);

// Sanity Check
server.get('/', (req, res) => {
    res.send('<h1>Sanity Check<h1>')
});

module.exports = server;