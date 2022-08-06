const { setup: setupTestServer } = require("jest-dev-server");
const { teardown: teardownTestServer } = require("jest-dev-server");
const keys = require("./../src/keys");

const helpers = {
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },

  baseUrl: "http://localhost:3000/graphql",
  headers: {
    Authorization: `Bearer ${keys.token}`,
  },

  async startServer() {
    const setup = await setupTestServer({
      command: `node ./src/server.js --port=3000`,
      launchTimeout: 50000,
      port: 3000,
    });
    return setup;
  },

  async stopServer() {
    await teardownTestServer();
    return 1;
  },
};

module.exports = helpers;
