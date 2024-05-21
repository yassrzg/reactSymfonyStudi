# Installation avec Docker

Pour installer et exécuter le projet avec Docker, suivez les étapes ci-dessous.

1) Rendez-vous à la racine du projet.
2) Exécutez la commande suivante pour construire et démarrer les conteneurs Docker :

``` bash
    docker-compose up --build
```

3) Pour arrêter les conteneurs, supprimer les conteneurs arrêtés, et redémarrer les conteneurs, exécutez la commande suivante :

``` bash
docker compose down && docker container prune && docker compose up
```

# Installation sans Docker

* Prérequis: php 8.2
* Nginx ou Apache2.
* Node.js version 20 minimum

## Étapes d'installation du backend

1) Rendez-vous dans le dossier Back du projet.
2) Exécutez la commande suivante pour installer les dépendances PHP :

``` bash
composer install
```

3) Créez une base de données avec MariaDB (ou MySQL) :

* Nom de la base de données : studiJo
* Nom d'utilisateur : studiJo
* Mot de passe : studiJo

Par exemple, pour MariaDB, vous pouvez utiliser les commandes suivantes :

```bash 
CREATE DATABASE studiJo;
CREATE USER 'studiJo'@'localhost' IDENTIFIED BY 'studiJo';
GRANT ALL PRIVILEGES ON studiJo.* TO 'studiJo'@'localhost';
FLUSH PRIVILEGES;
```

4) Vérifiez l'URL et le port de votre frontend dans le fichier config/packages/nelmio_cors.yaml pour éviter les problèmes de CORS.
5) Dans le dossier config, créez un dossier jwt :

``` bash
mkdir -p config/jwt
```

6) Créez des clés publique et privée pour JWT. Exécutez les commandes suivantes dans le dossier config/jwt :

```bash 
openssl genpkey -algorithm RSA -out private.pem -aes256
openssl pkey -in private.pem -out public.pem -pubout
```

Vous serez invité à entrer une phrase de passe pour protéger votre clé privée.

7) Faire les migrations pour la création des tables : 

``` bash
php bin/console doctrine:migrations
php bin/console doctrine:migrations:migrate
```


8) Faire un dump pour ajouté une copie de ma bdd: 

```bash 
mysql -u studiJo -p studiJo < dump.sql
```

9) Lancement du backend:

``` bash
php bin/console server:start
```

## Etapes d'installation du frontend

1) Se rendre dans le dossier Frontend du projet.
2) Exécutez la commande suivante pour installer les dépendances nodes :
   
``` bash
npm install
```

3) Se rendre dans le .env afin de vérifier dans la variables d'environnement, si l'url du backend est correct.
4) Se rendre dans package.json afin dy ajouté l'url de son backend dans la clé "proxy".
5) Lancer le site:

```bash
npm run start 
```


## Utilisation de stripe

Afin d'utiliser stripe, voici une carte de test (France) pour stripe:

``` bash 
4000 0025 0000 0003
```
