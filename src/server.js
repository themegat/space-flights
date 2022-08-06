const Koa = require("koa");
const { ApolloServer } = require("apollo-server-koa");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const keys = require("./keys");

const Port = 3000;

const server = {
  async startApolloServer() {
    const server = new ApolloServer({
      cors: {
        origin: "https://studio.apollographql.com",
        credentials: true,
      },
      cache: "bounded",
      introspection: true,
      typeDefs,
      resolvers,
      context: (context) => {
        const req = context.ctx.request;
        const token = req.header.authorization || "";

        if (token !== `Bearer ${keys.token}`)
          throw new Error("Authorization failed");
      },
    });
    await server.start();

    const app = new Koa();
    server.applyMiddleware({ app });

    app.listen({ port: Port }, () => {
      console.log(
        `Server ready at http://localhost:${Port}${server.graphqlPath}`
      );
    });
  },
};

server.startApolloServer();
