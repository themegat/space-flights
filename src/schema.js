const { gql } = require("apollo-server-koa");

const typeDefs = gql`
  type Pagination {
    total: Int
    page: Int
    pageSize: Int
  }

  type Planet {
    id: Int
    name: String
    code: String
    spaceCenters: [SpaceCenter]
  }

  type SpaceCenter {
    id: Int
    name: String
    uid: String
    description: String
    latitude: String
    longitude: String
    planetCode: String
    planet: Planet
  }

  type Flight {
    id: Int
    code: String
    departureAt: String
    seatCount: Int
    launchSiteUid: String
    launchSite: SpaceCenter
    landingSiteUid: String
    landingSite: SpaceCenter
    availableSeats: Int
  }

  type Booking {
    id: Int
    seatCount: Int
    email: String
    flightCode: String
    flight: Flight
  }

  type PgSpaceCenter {
    pagination: Pagination
  }

  type Query {
    planet(code: String!): Planet
    planets(limit: Int!): [Planet]
    spaceCenter(id: Int, uid: String): SpaceCenter
    spaceCenters(page: Int!, pageSize: Int!, code: String): [SpaceCenter]
    flight(id: Int!): Flight
    flights(from: Int, to: Int, seatCount: Int, departureDay: String, page: Int, pageSize: Int): [Flight]
  }

  type Mutation {
    scheduleFlight(
      launchSiteId: Int!
      landingSiteId: Int!
      departureAt: String!
      seatCount: Int!
    ): Flight
    bookFlight(seatCount: Int!, flightId: Int!, email: String!): Booking
  }
`;

module.exports = typeDefs;

/*
   hello: String
    planet(code: String!): Planet
*/
