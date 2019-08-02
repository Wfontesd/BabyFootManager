const { pool } = require("../db/database.js");
const express = require("express");
const router = express.Router();
const store = require("../store/sockets.js");

// Envoie d'un message
// Méthode POST avec les paramètres "pseudo" et "message" passés dans le corps de la requête
router.post("/tchat/:pseudo/:message", (req, res) => {
  const pseudo = req.params.pseudo;
  const message = req.params.message;
  const changes = {
    // Objet envoyé aux clients
    // Le timestamp n'est pas utilisé ici mais il est tout de même important de l'avoir
    timestamp: new Date(),
    type: "Message",
    data: {
      pseudo: pseudo,
      message: message
    }
  };
  res.sendStatus(200);
  store.propagateChanges(changes);
});
// Nouvelle partie avec insertion en base de donnée
// Méthode POST avec le paramètre "nomPartie" passé dans le corps de la requête
router.post("/:nomPartie", (req, res) => {
  const nomPartie = req.params.nomPartie;
  const requete =
    "INSERT INTO babyfootmanager.parties(partie_id, nompartie, partiefinie) VALUES (default, '" +
    nomPartie +
    "', default) RETURNING *";
  pool.query(requete, (err, _result) => {
    if (err) {
      res.sendStatus(422);
    } else {
      const rows = _result.rows;
      const changes = {
        // Objet envoyé aux clients
        timestamp: new Date(),
        type: "Create",
        data: {
          nom: nomPartie,
          partie_id: rows[0].partie_id,
          etatPartie: rows[0].partiefinie
        }
      };
      res.sendStatus(200);
      store.propagateChanges(changes);
    }
  });
});

// Modification de l'état d'une partie à "finie"
// Méthode PUT avec les paramètres "id" et "indexTable" passés dans le corps de la requête
router.put("/:id/:indexTable", (req, res) => {
  const partie_id = req.params.id;
  const requete =
    "UPDATE babyfootmanager.parties SET partiefinie = 'true' WHERE partie_id = '" +
    partie_id +
    "'";
  pool.query(requete, (err, _result) => {
    if (err) {
      res.sendStatus(422);
    } else {
      // Objet envoyé aux clients
      const changes = {
        timestamp: new Date(),
        type: "Update",
        data: {
          partie_id: partie_id,
          partieIndex: req.params.indexTable,
          partiefinie: true
        }
      };
      res.sendStatus(200);
      store.propagateChanges(changes);
    }
  });
});

// Supression d'une partie
// Méthode DELETE avec les paramètres "id" et "indexTable" passés dans le corps de la requête
router.delete("/:id/:indexTable", (req, res) => {
  const partie_id = req.params.id;
  const requete =
    "DELETE FROM babyfootmanager.parties WHERE partie_id = '" + partie_id + "'";
  pool.query(requete, (err, _result) => {
    if (err) {
      res.sendStatus(422);
    } else {
      // Objet envoyé aux clients
      const changes = {
        timestamp: new Date(),
        type: "Delete",
        data: {
          partieIndex: req.params.indexTable
        }
      };
      res.sendStatus(200);
      store.propagateChanges(changes);
    }
  });
});

module.exports = router;
