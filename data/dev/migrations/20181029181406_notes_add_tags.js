exports.up = function(knex, Promise) {
  return knex.schema.table("notes", tbl => {
    tbl.specificType("tags", "text ARRAY");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("notes", tbl => {
    tbl.dropColumn("tags");
  });
};
