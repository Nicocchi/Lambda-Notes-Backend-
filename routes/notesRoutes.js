const notesDb = require("../models/notesModel.js");

module.exports = server => {
  server.get("/api/notes/get/all", getNotes);
};

function getNotes(req, res) {
  notesDb
    .get()
    .then(notes => {
      // If no notes, return an empty array
      if (!notes) return res.status(404).json({ data: [] });

      res.send(notes);
    })
    .catch(err => res.status(500).send({ error: `Internal Server Error` }));
}
