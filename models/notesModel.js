const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    get,
    getById,
    add,
    update,
    remove,
};

/**
 * Returns all the notes in the database
 * @returns {*}
 */
function get() {
    return db('notes');
}

/**
 * Returns all the note of the given ID
 * @param id - The ID of the note
 * @returns {*} - Returns every note from the given ID
 */
function getById(id) {
    return db.select('*').from('notes').where({ id });
}

/**
 * Return all the notes of from the given user ID
 * @param id - The ID of the user
 * @returns {*} - Returns every note from the given user ID
 */
function getByUser(id) {
    return db.select('*').from('notes').where('user_id', id);
}

/**
 * Adds a new note to the database
 * @param note - The new note to add
 * @returns {*} - Returns the notes
 */
function add(note) {
    return db('notes').insert(note).into('notes');
}

/**
 * Update an existing note in the database
 * @param id - The ID of the note to update
 * @param changes - The actual changes of the note itself
 * @returns {*} - Returns the note ID
 */
function update(id, changes) {
    return db('notes').where({ id }).update(changes);
}

/**
 * Removes a note from the database
 * @param id - The ID of teh note to remove
 * @returns {*} - Returns the note ID
 */
function remove(id) {
    return db('notes').where({ id }).del();
}