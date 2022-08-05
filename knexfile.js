// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
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
};
