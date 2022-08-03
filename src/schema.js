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
    planet_code: String
    planet: Planet
  }

  type PgSpaceCenter {
    pagination: Pagination
  }

  type Query {
    planets(limit: Int!): [Planet]
    spaceCenters(page: Int!, pageSize: Int!, code: String): [SpaceCenter]
    spaceCenter(id: Int, uid: String): SpaceCenter
  }
`;

module.exports = typeDefs;

/*
   hello: String
    planet(code: String!): Planet
*/
