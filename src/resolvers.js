const planet = require("./data/planets");
const Queries = require("./persistance.js");

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    planets: () => Queries.getPlanets(),
    async planet(parent, args, context, info) {
      const data = await Queries.getPlanets();
      return data.find((item) => item.code === args.code);
    },
    spaceCenters: () => Queries.getSpaceCenters(),
  },
};

module.exports = resolvers;
