const { pool } = require("../database.js");
module.exports = {
  pageAccueil: (req, res) => {
    let requete = "SELECT * FROM babyfootmanager.parties";
    let requete2 =
      "SELECT * FROM babyfootmanager.parties WHERE partiefinie = 'false'";
    pool.query(requete, (err, result) => {
      if (err) {
        res.sendStatus(422);
      } else {
        pool.query(requete2, (err, result2) => {
          res.render("index.ejs", {
            title: "BabyFootManager - Test Recrutement Easylis",
            parties: result.rows,
            compteurParties: result2.rowCount
          });
        });
      }
    });
  }
};
