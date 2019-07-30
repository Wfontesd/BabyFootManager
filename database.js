const pg = require("pg");
// On configure ici les accés à la base de données
const configuration = {
  user: "postgres",
  database: "babyfootmanagerDB",
  password: "babyfootmanager",
  port: 5432
};
const pool = new pg.Pool(configuration);

module.exports = {
  pool
};
