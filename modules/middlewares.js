const express = require("express");
const cors = require("cors");

const configureNoteRoutes = require("../routes/notesRoutes.js");
const configureUserRoutes = require("../routes/usersRoutes.js");

module.exports = server => {
  server.use(express.json());
  server.use(cors());
  configureNoteRoutes(server);
  configureUserRoutes(server);
};
