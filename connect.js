const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];

const kenxConfig = require("knex")(config);
module.exports = kenxConfig;
