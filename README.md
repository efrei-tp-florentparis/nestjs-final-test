# TodoList API

Ce projet est une API de gestion de tâches (TodoList) construite avec le framework [NestJS](https://nestjs.com/).

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

-   [Node.js](https://nodejs.org/) (version 12.x ou supérieure)
-   [npm](https://www.npmjs.com/)
-   [docker](https://www.docker.com/) (Pensez à bien l'avoir lancé et que le 3000 soit libre sur votre machine)

## Installation

1. Clonez le repository :

    ```bash
    git clone https://github.com/efrei-tp-florentparis/nestjs-final-test
    cd nestjs-final-test
    ```

2. Installez les dépendances du projet :

    ```bash
    npm ci
    ```

## Lancer le serveur

Pour lancer le serveur en utilisant PostgreSQL, utilisez la commande suivante :

```bash
npm run start:postgres
```

Le serveur sera lancé et accessible à l'adresse http://localhost:3000.

## Lancer les tests

Pour exécuter les tests de bout en bout (E2E) avec PostgreSQL, utilisez la commande suivante :

```bash
npm run test:e2e:postgres
```

Les tests se lanceront indépendamment du serveur.

## Auteur du projet

Je suis seul à avoir travaillé dessus: PARIS Florent.
