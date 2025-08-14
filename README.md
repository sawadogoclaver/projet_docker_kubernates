# projet_docker_kubernates
Appli de saisie de données et de visualisation avec docker et kubernates

## Description

Cette application permet aux utilisateurs de saisir de données pour ensuite voir une agrégation des résultats.

Elle est composée des services suivants:
- PHP : Application d'affichage des données agrégées.
- Node.js : Application de saisie des données.
- PostgreSQL : Base de données pour stocker les données.
La base de données devra etre persistée en local pour garder les données saisies.

-Créez un réseau nommé « reseau_msr » avec le masque 172.16.100.0/24 et passerelle 172.16.100.1 que vous allez utiliser pour deployer vos conteneurs.

## Configuration
- Le fichier init.sql dans le dossier db du projet permet d'initialiser la base de données.
- Le fichier index.js contient le formulaire la saisie des données et affiche les données agrégées.
- Le fichier resultat.php traite les données et les stocke dans PostgreSQL.
- Le fichier package.json contient les dépendances Node.js.

### Prérequis

- Docker
- Docker-Compose
- kubenates

### Installation

1. Clonez le dépôt :

```sh
git clone https://github.com/sawadogoclaver/projet_docker_kubernates.git
cd projet_docker_kubernates
```
2. L'application doit etre conteneurisé pour etre lancé directement avec la commande: docker-compose up --build
```Le service node et php devront avoir un fichier dockerfile chacun pour compiler l'image du conteneur.

Cela va démarrer les services et vous pourrez accéder à l'application via (veillez respecter les numeros de port):

- Node.js (Saisie) : http://localhost:8090
- PHP (Résultats) : http://localhost:3005

```
3. Ensuite ajouter la configuration kubernates pour gerer le lancement automatique des conteneurs.
``` Utilisez minicube et kubectl pour faire le deploiment.
Lancez l'application à partir de kubernates!

# Structure_finale_du_projet
microservices-project/
│
├── node-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│
├── php-service/
│   ├── Dockerfile
│   ├── resultat.php
│
├── k8s/
│   ├── node-deployment.yaml
│   ├── php-deployment.yaml
│   ├── postgres-deployment.yaml
│   ├── services.yaml
│
└── docker-compose.yml
