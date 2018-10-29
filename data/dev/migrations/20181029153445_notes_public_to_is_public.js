exports.up = function(knex, Promise) {
  return knex.schema.table("notes", tbl => {
    tbl.renameColumn("public", "is_public");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("notes", tbl => {
    tbl.renameColumn("is_public", "public");
  });
};
