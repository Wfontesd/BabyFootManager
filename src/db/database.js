const pg = require("pg");
// On configure ici les accés à la base de données
const configuration = {
  user: "postgres",
  database: "babyfootmanagerDB",
  password: "babyfootmanager",
  port: 5432
};
const pool = new pg.Pool(configuration);

// On check si on peut se connecter à la bd au lancement du serveur
pool
  .connect()
  .then(client => {
    console.log("Successfully connected to database");
    return;
  })
  .catch(e => {
    console.error("Could not connect to DB");
    console.error(e.stack);
    process.exit(1);
  });

module.exports = {
  pool
};
