const express = require('express');
const cors = require('cors');

module.exports = server => {
    server.use(express.json(), cors());
}