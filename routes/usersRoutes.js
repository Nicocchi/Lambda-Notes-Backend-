const bcrypt = require("bcryptjs");
const usersDb = require("../models/usersModel");
const { generateToken } = require("../modules/middlewares");

module.exports = server => {
  server.post("/api/user/register", register);
};

function register(req, res) {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  usersDb
    .add(creds)
    .then(ids => {
      const id = ids[0];
      const token = generateToken({ username: creds.username });
      res.status(201).json({ newUserId: id, token });
    })
    .catch(err => {
      res.status(500).json(err);
    });
}
