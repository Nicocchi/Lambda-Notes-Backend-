const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const configureNoteRoutes = require("../routes/notesRoutes.js");

const jwtKey = process.env.JWT;

module.exports = server => {
  server.use(express.json());
  server.use(cors());
  configureNoteRoutes(server);
  authenticate, generateToken;
};

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
