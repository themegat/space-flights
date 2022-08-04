const spaceCenters = require("../src/data/space-centers");

const tableName = "space_center";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(tableName)
    .truncate()
    .then(() => {
      return knex(tableName).insert(spaceCenters);
    });
};
