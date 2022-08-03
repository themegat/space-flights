const Koa = require("koa");
const { ApolloServer } = require("apollo-server-koa");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const Port = 3000;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  const app = new Koa();
  server.applyMiddleware({ app });

  app.listen({ port: Port }, () => {
    console.log(
      `Server ready at http://localhost:${Port}${server.graphqlPath}`
    );
  });
}

startApolloServer();
