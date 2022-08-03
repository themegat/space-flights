const planet = require("../src/data/planets");

const tableName = "planet";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(tableName)
    .truncate()
    .then(() => {
      return knex(tableName).insert(planet);
    });
};
