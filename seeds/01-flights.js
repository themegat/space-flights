const flight = require("../src/data/flights");

const tableName = "flight";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(tableName)
    .truncate()
    .then(() => {
      return knex(tableName).insert(flight);
    });
};
