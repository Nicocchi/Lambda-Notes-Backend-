const bcrypt = require("bcryptjs");
const usersDb = require("../models/usersModel");
const { generateToken } = require("../modules/middlewares");

module.exports = server => {
  server.post("/api/user/register", register);
  server.post("/api/user/login", login);
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

function login(req, res) {
  const creds = req.body;
  usersDb
    .getByEmail(creds.email)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken({ username: user.username });
        res.status(200).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: "username or Password is incorrect" });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
}
