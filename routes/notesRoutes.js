const notesDb = require("../models/notesModel.js");

module.exports = server => {
  server.get("/api/notes/get/all", getNotes);
  server.get("/api/notes/get/:id", getNote);
  server.post("/api/note/create", validation, addNote);
  server.put("/api/note/edit/:id", validation, updateNote);
  server.delete("/api/note/remove/:id", removeNote);
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

      res.json(notes);
    })
    .catch(err => res.status(500).send({ error: `Internal Server Error` }));
}

/**
 * Return the note from the given ID
 * @param req - request
 * @param res - response
 */
function getNote(req, res) {
  const { id } = req.params;
  notesDb
    .getById(id)
    .then(note => {
      if (!note) return res.status(404).json({ error: `Note does not exist` });

      res.status(200).json(note);
    })
    .catch(err => res.status(500).json({ error: `Internal Server Error` }));
}

/**
 * Add a note to the database and return the ID of that note
 * @param req - request
 * @param res - response
 */
function addNote(req, res) {
  const { title, content, completed, is_public, user_id, tags } = req.body;

  const newNote = { title, content, completed, is_public, user_id, tags };
  console.log(newNote);
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
  const { title, content, completed, is_public, user_id, tags } = req.body;

  const newNote = { title, content, completed, is_public, user_id, tags };
  notesDb
    .update(id, newNote)
    .then(note => {
      if (!note) return res.status(404).json({ error: `Note does not exist` });

      res.status(200).json(note);
    })
    .catch(err => res.status(500).json({ error: `Internal Server Error` }));
}

/**
 * Remove an existing note and return the 1 or 0
 * @param req
 * @param res
 */
function removeNote(req, res) {
  const { id } = req.params;
  notesDb
    .remove(id)
    .then(note => {
      if (!note) return res.status(404).json({ error: `Note does not exist` });
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json({ error: `Internal Server Error` }));
}

// MIDDLEWARE
function validation(req, res, next) {
  if (!req.body.title)
    return res.status(404).json({ error: `Must have a title` });
  if (!req.body.tags) req.body.tags = [];
  if (!req.body.content) req.body.content = "";
  if (!req.body.user_id) req.body.user_id = 1;
  if (!req.body.completed) req.body.completed = false;
  if (!req.body.is_public) req.body.is_public = false;
  next();
}
