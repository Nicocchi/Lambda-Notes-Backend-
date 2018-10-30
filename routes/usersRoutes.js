const bcrypt = require("bcryptjs");
const usersDb = require("../models/usersModel");
const logger = require("../modules/Logger.js");

const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWTKEY;

module.exports = server => {
  server.post("/api/users/register", registerValidation, register);
  server.post("/api/users/login", loginValidation, login);
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
      res.status(500).json(err.message);
    });
}

function login(req, res) {
  const creds = req.body;

  usersDb
    .getByEmail(creds.email)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user[0].password)) {
        const token = generateToken({ username: user[0].username });
        res.status(200).json({ welcome: user[0].username, token });
      } else {
        res.status(401).json({ message: "username or Password is incorrect" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

function loginValidation(req, res, next) {
  if (!req.body.password)
    return res.status(404).json({ error: "Must have a password" });
  if (!req.body.email)
    return res.status(404).json({ error: "Must have a email address" });
  if (validateEmail(req.body.email)) {
    next();
  } else {
    return res.status(422).json({ error: "Must be a valid email address" });
  }
}

function registerValidation(req, res, next) {
  if (!req.body.username)
    return res.status(404).json({ error: "Must have a username" });
  if (!req.body.password)
    return res.status(404).json({ error: "Must have a password" });
  if (!req.body.email)
    return res.status(404).json({ error: "Must have a email address" });
  if (validateEmail(req.body.email)) {
    usersDb.getByEmail(req.body.email).then(user => {
      if (user[0]) {
        return res.status(422).json({ error: "That email is already taken" });
      } else {
        usersDb.getByUsername(req.body.username).then(user => {
          if (user)
            return res
              .status(422)
              .json({ error: "That username is already taken" });
          next();
        });
      }
    });
  } else {
    return res.status(422).json({ error: "Must be a valid email address" });
  }
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
 * Authenticates the JSON Web Token to acquire access to restricted routes
 * @param req - Request
 * @param res - Response
 * @param next - Continues function
 * @returns {*}
 */
function authenticate(req, res, next) {
  const token = req.get("Authorization");

  // If token, verify the token and set decoded
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: "No token provided, must be set on Authorization Header"
    });
  }
}

/**
 * Generates a token for the JSON Web Token
 * @param user - The user to generate a token for and information stored
 * @returns {*}
 */
function generateToken(user) {
  const jwtPayload = user;
  const jwtOptions = {
    expiresIn: "3m"
  };

  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}
