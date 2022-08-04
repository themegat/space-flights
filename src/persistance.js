const { Knex } = require("knex");
const knex = require("../connect");
const tablePlanets = "planet";
const tableSpaceCenters = "space_center";
const tableFlights = "flight";
const tableBookings = "booking";

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

  /**
   * Returns the flights
   * @returns {Array}
   */
  getFlights() {
    return knex(tableFlights).select("*");
  },

  /**
   * Returns the bookings
   * @returns {Array}
   */
  getBookings() {
    return knex(tableBookings).select("*");
  },
};

const Mutations = {
  /**
   * Create a flight
   * @param code String
   * @param launchSiteUid String
   * @param landingSiteUid String
   * @param departureAt DateTime
   * @param seatCount Int
   *
   * @returns {Flight}
   */
  scheduleFlight(code, launchSiteUid, landingSiteUid, departureAt, seatCount) {
    return knex(tableFlights).insert(
      {
        code,
        launchSiteUid,
        landingSiteUid,
        departureAt,
        seatCount,
      },
      "id"
    );
  },

  /**
   * Create a flight booking
   * @param seatCount Int
   * @param email String
   * @param flightCode String
   *
   * @returns {Booking}
   */
  bookFlight(seatCount, flightCode, email) {
    return knex(tableBookings).insert({
      seatCount,
      email,
      flightCode,
    });
  },
};

module.exports = { Queries, Mutations };
// module.exports = Mutations;
