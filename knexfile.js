// Update with your config settings.
//host.docker.internal
//127.0.0.1

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      database: "strapi",
      user: "strapi",
      password: "test",
    },
    seeds: {},
  },
  development: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      database: "strapi",
      user: "strapi",
      password: "test",
    },
    seeds: {},
  },
  production: {
    client: "postgresql",
    connection: {
      host: "host.docker.internal",
      port: 5432,
      database: "strapi",
      user: "strapi",
      password: "test",
    },
    seeds: {},
  },
};
