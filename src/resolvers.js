const planet = require("./data/planets");
const Queries = require("./persistance.js");

const resolvers = {
  Query: {
    // hello: () => "Hello world!",
    // async planet(parent, args, context, info) {
    //   const data = await this.planets();
    //   return data.find((item) => item.code === args.code);
    // },

    async planets(parent, args, context, info) {
      const planets = await Queries.getPlanets();
      const limit = args.limit || 5;
      const spaceCenters = await Queries.getSpaceCenters();
      return planets.map((planet) => {
        return {
          ...planet,
          spaceCenters: spaceCenters
            .filter((item) => item.planet_code == planet.code)
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
          : data.filter((item) => item.planet_code === args.code);

      const node = data
        .slice(offset)
        .slice(0, pageSize)
        .map((item) => {
          return {
            ...item,
            planet: planets.find((planet) => planet.code === item.planet_code),
          };
        });

      return node;
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
            planet: planets.find(
              (planet) => planet.code === center.planet_code
            ),
          };
        })
        .find((center) => center.id === id || center.uid === uid);

      return node;
    },
  },
};

module.exports = resolvers;
