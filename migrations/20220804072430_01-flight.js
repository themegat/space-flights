const tableName = "flight";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table.string("code");
    table.datetime("departureAt");
    table.integer("seatCount");
    table.string("launchSiteUid");
    table.string("landingSiteUid");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableName);
};
