const express = require("express");
const cors = require("cors");

const configureNoteRoutes = require("../routes/notesRoutes.js");

module.exports = server => {
  server.use(express.json());
  server.use(cors());
  configureNoteRoutes(server);
};
