exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', tbl => {
        tbl.increments();
        tbl.integer('user_id', 255).unsigned().notNullable().references('id').inTable('users');
        tbl.string('title', 255).notNullable();
        tbl.string('content', 255);
        tbl.boolean('completed');
        tbl.boolean('public').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.DropTableIfExists('notes');
};
