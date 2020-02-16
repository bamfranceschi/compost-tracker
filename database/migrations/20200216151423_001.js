exports.up = function(knex) {
  return knex.schema
    .createTable("users", function(tbl) {
      tbl.increments("id");
      tbl
        .string("username", 128)
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
    })
    .createTable("projects", function(tbl) {
      tbl.increments("id");
      tbl.string("name").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })
    .createTable("records", function(tbl) {
      tbl.increments("id");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.integer("temp");
      tbl.string("texture");
      tbl.string("notes");
    })
    .createTable("materials", function(tbl) {
      tbl.increments("id");
      tbl.string("name").notNullable();
      tbl.string("type").notNullable();
    })
    .createTable("record_materials", function(tbl) {
      tbl.increments("id");
      tbl
        .integer("record_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("records")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl
        .integer("material_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("materials")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      tbl.float("amount");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("record_materials")
    .dropTableIfExists("materials")
    .dropTableIfExists("records")
    .dropTableIfExists("projects")
    .dropTableIfExists("users");
};
