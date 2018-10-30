exports.up = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
    tbl
      .string("email", 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", tbl => {
    tbl.dropColumn("email");
  });
};
