const tableName = "space_center";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table.string("name");
    table.string("uid");
    table.text("description");
    table.string("latitude");
    table.string("longitude");
    table.string("planetCode");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(knex);
};
