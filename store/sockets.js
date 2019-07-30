class SocketStore {
  constructor() {
    this.store = [];
  }
  // Ajoute une socket au tableau de socket "store"
  putSocket(key, socket) {
    this.store[key] = socket;
  }

  // Propage les changements à toutes les sockets du tableau "store"
  propagateChanges(changes) {
    for (const key in this.store) {
      this.store[key].emit("changes", changes);
    }
  }

  // Supprime une socket du tableau "store" en fonction de son identifiant
  removeSocket(key) {
    delete this.store[key];
  }
}

module.exports = new SocketStore();
