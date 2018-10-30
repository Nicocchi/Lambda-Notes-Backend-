exports.up = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
    tbl.string("email", 128).unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
    tbl.dropColumn("email");
  });
};
