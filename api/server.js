const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet(), express.json());

// Sanity Check
server.get('/', (req, res) => {
    res.send('<h1>Sanity Check<h1>')
});

module.exports = server;