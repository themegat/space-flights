const { gql } = require("apollo-server-koa");

const typeDefs = gql`
  type Planet {
    id: Int
    name: String
    code: String
  }

  type SpaceCenter {
    id: Int
    name: String
    uid: String
    description: String
    latitude: String
    longitude: String
    planet_code: String
  }

  type Query {
    hello: String
    planets: [Planet]
    planet(code: String!): Planet
    spaceCenters: [SpaceCenter]
  }
`;

module.exports = typeDefs;
