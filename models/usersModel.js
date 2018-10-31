const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  get,
  getById,
  getByUsername,
  getByEmail,
  add,
  update,
  remove
};

/**
 * Returns all the users in the database
 * @returns {*}
 */
function get() {
  return db("users");
}

/**
 * Returns all the users of the given ID
 * @param id - The ID of the note
 * @returns {*} - Returns every user from the given ID
 */
function getById(id) {
  return db
    .select("*")
    .from("users")
    .where("id", id);
}

/**
 * Returns the users with the username
 * @param username - Username of the user
 * @returns {*}
 */
function getByUsername(username) {
  return db
    .select("*")
    .from("users")
    .where("username", username)
    .first();
}

/**
 * Returns the user with the email address
 * @param email - Email address of the user
 * @returns {*}
 */
function getByEmail(email) {
  return db
    .select("*")
    .from("users")
    .where("email", email);
}

/**
 * Adds a new user to the database
 * @param user - The new user to add
 * @returns {*} - Returns the notes
 */
function add(user) {
  return db("users")
    .insert(user)
    .into("users");
}

/**
 * Update an existing user in the database
 * @param id - The ID of the note to update
 * @param changes - The actual changes of the user itself, ie - email, password, username
 * @returns {*} - Returns the user ID
 */
function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

/**
 * Removes a user from the database
 * @param id - The ID of the user to remove
 * @returns {*} - Returns the user ID
 */
function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
