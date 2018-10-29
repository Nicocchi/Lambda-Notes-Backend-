const notesDb = require("../models/notesModel.js");
const logger = require("../modules/Logger.js");

module.exports = server => {
  server.get("/api/notes/get/all", getNotes);
  server.post("/api/notes/create", addNote);
  server.put("/api/notes/edit/:id", updateNote);
};

/**
 * Return all the notes from the database
 * @param req - request
 * @param res - response
 */
function getNotes(req, res) {
  notesDb
    .get()
    .then(notes => {
      // If no notes, return an empty array
      if (!notes) return res.status(200).json({ data: [] });

      res.send(notes);
    })
    .catch(err => res.status(500).send({ error: `Internal Server Error` }));
}

/**
 * Add a note to the database and return the ID of that note
 * @param req - request
 * @param res - response
 */
function addNote(req, res) {
  const { title, content, completed, is_public, user_id } = req.body;

  const newNote = { title, content, completed, is_public, user_id };
  notesDb
    .add(newNote)
    .then(noteId => {
      // Return the ID
      res.status(201).json(noteId);
    })
    .catch(err => res.status(500).json({ error: `Internal Server Error` }));
}

/**
 * Updates an existing note from the given ID
 * @param req - request
 * @param res - response
 */
function updateNote(req, res) {
  const { id } = req.params;
  const { title, content, completed, is_public, user_id } = req.body;

  const newNote = { title, content, completed, is_public, user_id };
  notesDb
    .update(id, newNote)
    .then(note => {
      if (!note) return res.status(422).json({ error: `Note does not exist` });

      res.status(200).json(note);
    })
    .catch(err => res.status(500).json({ error: `Internal Server Error` }));
}
