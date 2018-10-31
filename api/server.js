const express = require("express");

const configureMiddleware = require("../modules/middlewares.js");

const server = express();
configureMiddleware(server);

module.exports = server;
