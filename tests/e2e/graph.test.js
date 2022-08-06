const axios = require("axios");
const helpers = require("../helpers");
const queries = require("../data/queries");

beforeAll(async () => {
  await helpers.startServer();
});

describe("Testing Graph queries", () => {
  test("Test graph authorization should fail", async () => {
    try {
      await axios.post(helpers.baseUrl);
    } catch (err) {
      const message = err.response.data.errors[0].message;
      expect(message).toContain("Authorization failed");
      expect(err.response.status).toEqual(500);
    }
  });

  test("Test flights should return a list of flights", async () => {
    try {
      const response = await axios.post(helpers.baseUrl, queries.flights, {
        headers: helpers.headers,
      });
      const flights = response.data.data.flights;
      expect(flights.length).toEqual(queries.flights.variables.pageSize);
    } catch (err) {
      console.log(err);
    }
  });
});

describe("Testing Graph mutations", () => {
  test("Test bookFlight should book a flight", async () => {
    try {
      const response = await axios.post(helpers.baseUrl, queries.bookFlight, {
        headers: helpers.headers,
      });
      const booking = response.data.data.bookFlight;
      expect(parseInt(booking.id)).toBeGreaterThan(0);
      expect(booking.email).toMatch(queries.bookFlight.variables.email);
      expect(booking.seatCount).toEqual(queries.bookFlight.variables.seatCount);
    } catch (err) {
      console.log(err);
    }
  });
});

afterAll(async () => {
  helpers.stopServer();
});
