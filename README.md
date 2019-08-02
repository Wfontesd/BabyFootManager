# BabyFootManager

BabyFootManager est une application web de type RIA permettant de créer des parties de babyfoot de manière collaborative.

## Guide de l'application

### Prérequis

- PostgreSQL 11
- Node.js
- NPM
- PgAdmin

### Installation

#### Etape 1 : Mise en place de la base de données avec PgAdmin

##### Créez votre base de données

```
Create => Database
```

#### Restaurer la base de données

```
Clic-droit sur votre base de données => Restore => Indiquez le chemin du fichier "BaseDeDonnées" présent dans le dossier "./data" puis cliquez sur "Restore"
```

#### Modifier le fichier database.js

A l'aide d'un éditeur de texte, ouvrez le fichier database.js puis modifiez les lignes suivantes

```
const configuration = {
  user: "postgres",
  database: "babyfootmanagerDB",
  password: "babyfootmanager",
  port: 5432
};
```

- "database" correspond au nom de votre base de données
- "user" correspond à l'utilisateur de la base
- "password" correspond au mot de passe de l'utilisateur
- "port" correspond au port de votre serveur PostgreSQL 11

#### Etape 2 : Démarrage du serveur de l'application

Ouvrez un invite de commande dans le dossier de l'application et exécutez la ligne suivante

```
npm install
npm run start
```

### Utilisation

Pour utiliser l'application, ouvrez votre navigateur et saisissez dans votre barre d'adresse la ligne suivante

```
http://localhost:8080/
```

## Auteur

- **William FONTES DE AGUIAR**
