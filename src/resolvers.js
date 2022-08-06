const Persistance = require("./persistance.js");
const Queries = Persistance.Queries;
const Mutations = Persistance.Mutations;

const resolvers = {
  // QUERIES
  Query: {
    async planet(parent, args, context, info) {
      const data = await this.planets(parent, { limit: 100 });
      return data.find((item) => item.code === args.code);
    },

    async planets(parent, args, context, info) {
      const planets = await Queries.getPlanets();

      const limit = args.limit || 5;
      const spaceCenters = await Queries.getSpaceCenters();
      return planets.map((planet) => {
        return {
          ...planet,
          spaceCenters: spaceCenters
            .filter((item) => item.planetCode == planet.code)
            .splice(0, limit),
        };
      });
    },

    async spaceCenters(parent, args, context, info) {
      const pageSize = args.pageSize || 10;
      const page = args.page || 1;
      const offset = (page - 1) * pageSize;

      let data = await Queries.getSpaceCenters();
      const planets = await Queries.getPlanets();

      data =
        args.code === undefined
          ? data
          : data.filter((item) => item.planetCode === args.code);

      const nodes = data
        .slice(offset)
        .slice(0, pageSize)
        .map((item) => {
          return {
            ...item,
            planet: planets.find((planet) => planet.code === item.planetCode),
          };
        });

      return {
        nodes,
        pagination: {
          total: nodes.length,
          page,
          pageSize,
        },
      };
    },

    async spaceCenter(parent, args, context, info) {
      const id = args.id;
      const uid = args.uid;

      const data = await Queries.getSpaceCenters();
      const planets = await Queries.getPlanets();

      const node = data
        .map((center) => {
          return {
            ...center,
            planet: planets.find((planet) => planet.code === center.planetCode),
          };
        })
        .find((center) => center.id === id || center.uid === uid);

      return node;
    },

    async flight(parent, args, context, info) {
      const id = args.id;
      const bookings = await getBookings();
      const flights = await getFlights(bookings);
      return flights.find((flight) => flight.id === id);
    },

    async flights(parent, args, context, info) {
      const centers = await Queries.getSpaceCenters();
      const fromSiteId = args.from;
      const toSiteId = args.to;
      const seatCount = args.seatCount;
      let departureDay = args.departureDay;
      departureDay = departureDay === undefined ? "" : new Date(departureDay);

      const pageSize = args.pageSize || 10;
      const page = args.page || 1;
      const offset = (page - 1) * pageSize;

      let launchSiteUid = centers.find((center) => center.id === fromSiteId);
      let landingSiteUid = centers.find((center) => center.id === toSiteId);

      launchSiteUid = launchSiteUid === undefined ? "" : launchSiteUid.uid;
      landingSiteUid = landingSiteUid === undefined ? "" : landingSiteUid.uid;

      const bookings = await getBookings();
      const flights = await getFlights(bookings);
      let result = flights.filter(
        (flight) =>
          flight.launchSiteUid === launchSiteUid ||
          flight.landingSiteUid === landingSiteUid ||
          flight.seatCount === seatCount ||
          (new Date(flight.departureAt) >= departureDay &&
            new Date(flight.departureAt) <= departureDay)
      );

      result =
        result.length === 0
          ? flights.filter((flight) => flight.id > 0)
          : result;

      const nodes = result.slice(offset).slice(0, pageSize);

      return {
        nodes,
        pagination: {
          total: nodes.length,
          page,
          pageSize,
        },
      };
    },

    async booking(parent, args, context, info) {
      const id = args.id;

      const bookings = await getBookings();
      return bookings.find((booking) => booking.id === id);
    },

    async bookings(parent, args, context, info) {
      const pageSize = args.pageSize || 10;
      const page = args.page || 1;
      const offset = (page - 1) * pageSize;
      const email = args.email || "";

      const bookings = await getBookings();
      const nodes = bookings
        .filter((booking) => booking.email.includes(email))
        .slice(offset)
        .slice(0, pageSize);

      return {
        nodes,
        pagination: {
          total: nodes.length,
          page,
          pageSize,
        },
      };
    },
  },

  //MUTATIONS
  Mutation: {
    async scheduleFlight(_, variables) {
      const centers = await Queries.getSpaceCenters();

      const launchSiteUid = centers.find(
        (center) => center.id === variables.launchSiteId
      ).uid;
      const landingSiteUid = centers.find(
        (center) => center.id === variables.landingSiteId
      ).uid;
      const departureAt = new Date(variables.departureAt);
      const seatCount = variables.seatCount;

      const result = await Mutations.scheduleFlight(
        launchSiteUid,
        landingSiteUid,
        departureAt,
        seatCount
      );

      const flight = await resolvers.Query.flight(_, { id: result[0].id });
      return flight;
    },

    async bookFlight(_, variables) {
      const flightId = variables.flightId;
      const flight = await resolvers.Query.flight(_, { id: flightId });
      const bookings = await getBookings();
      const seatCount = variables.seatCount;
      const email = variables.email;

      const availableSeats = getAvailableSeats(
        bookings,
        flight.code,
        flight.seatCount
      );
      if (availableSeats < seatCount) {
        throw new Error("Required seats are unavailable");
      }

      const result = await Mutations.bookFlight(seatCount, flight.code, email);

      const booking = await resolvers.Query.booking(_, { id: result[0].id });
      return booking;
    },
  },
};

async function getBookings() {
  const flights = await getFlights([]);

  const bookings = await Queries.getBookings();
  return bookings.map((booking) => {
    return {
      ...booking,
      flight: flights.find((item) => item.code === booking.flightCode),
    };
  });
}

/**
 * @param {Array} bookings
 *
 */

async function getFlights(bookings) {
  const flights = await Queries.getFlights(bookings);
  const spaceCenters = await Queries.getSpaceCenters();
  const planets = await Queries.getPlanets();
  bookings = bookings === undefined ? [] : bookings;

  return flights.map((flight) => {
    flight.launchSite = spaceCenters
      .map((center) => {
        return {
          ...center,
          planet: planets.find((planet) => planet.code === center.planetCode),
        };
      })
      .find((item) => item.uid === flight.launchSiteUid);

    flight.landingSite = spaceCenters
      .map((center) => {
        return {
          ...center,
          planet: planets.find((planet) => planet.code === center.planetCode),
        };
      })
      .find((item) => item.uid === flight.landingSiteUid);

    flight.departureAt = new Date(flight.departureAt).toDateString();
    flight.availableSeats = getAvailableSeats(
      bookings,
      flight.code,
      flight.seatCount
    );

    return flight;
  });
}

/**
 * Get available seat for a flight
 *
 * @param {Array} bookings
 * @param {string} flightCode
 * @param {number} flightSeats
 *
 * @returns {number} availableSeats
 */

function getAvailableSeats(bookings, flightCode, flightSeats) {
  if (!bookings || bookings.length === 0) return flightSeats;
  let result = bookings.reduce((value, booking) => {
    if (booking.flightCode === flightCode) return value + booking.seatCount;
  }, 0);
  result = !result || result === NaN ? 0 : result;
  return flightSeats - result;
}

module.exports = resolvers;
