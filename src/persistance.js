const knex = require("../connect");
const tablePlanets = "planet";
const tableSpaceCenters = "space-center";

const Queries = {
  /**
   * Returns the planets
   * @returns {Array}
   */
  getPlanets() {
    return knex(tablePlanets).select("*");
  },

  /**
   * Returns the space centers
   * @returns {Array}
   */
  getSpaceCenters() {
    return knex(tableSpaceCenters).select("*");
  },
};

module.exports = Queries;
