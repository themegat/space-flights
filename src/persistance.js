const knex = require("../connect");
const crypto = require("crypto");

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
   * @param launchSiteUid String
   * @param landingSiteUid String
   * @param departureAt DateTime
   * @param seatCount Int
   *
   * @returns {Flight}
   */
  scheduleFlight(launchSiteUid, landingSiteUid, departureAt, seatCount) {
    const code = crypto.randomBytes(8).toString("hex");

    return knex(tableFlights).insert(
      {
        code,
        launchSiteUid,
        landingSiteUid,
        departureAt,
        seatCount,
      },
      [
        "id",
        "code",
        "launchSiteUid",
        "landingSiteUid",
        "departureAt",
        "seatCount",
      ]
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
    return knex(tableBookings).insert(
      {
        seatCount,
        email,
        flightCode,
      },
      ["id", "seatCount", "email", "flightCode"]
    );
  },
};

module.exports = { knex, Queries, Mutations };
