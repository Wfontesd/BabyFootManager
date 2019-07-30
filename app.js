const express = require("express");
const store = require("./store/sockets.js");
const path = require("path");

const app = express();
const port = 8080;

serveur = require("http").createServer(app);
io = require("socket.io").listen(serveur);

// Gestion des sockets lors d'une connexion et déconnexion
io.sockets.on("connection", function(socket) {
  // Lors d'une connexion on sauvegarde la socket dans un tableau de socket
  store.putSocket(socket.id, socket);

  socket.on("disconnect", function() {
    // Lors d'une deconnexion on suppprime la socket qui se déconnecte du tableau de socket
    store.removeSocket(socket.id);
  });
});

const { pageAccueil } = require("./routes/index");
const partieRouter = require("./routes/partie");

app.use(express.static(path.join(__dirname, "public")));

// On définie le moteur de modèle et le répertoire ou se trouvent les fichiers modèles
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Gestion des routes
app.get("/", pageAccueil);
app.use("/partie", partieRouter);

serveur.listen(port);
