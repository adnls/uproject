# <span style="color:#F17D80"> uBot <span style="color:#354458"> Backend
___
___
# <span style="color:#60047A"> Backend-Part
### <span style="color:#29ABA4"> Etat actuel
#### 1° <span style="color:#354458"> Microservices et communication
``2 MicroServices :``
- ##### MotherApp: 

> _**Rècupère les données de l'api CoinMarketCap**_ (appeler CMC pour la suite) (déclenchée par class core, executée par la class api client)

> Données API-CMC sur un instant T. _**Stocké en bdd pour avoir un historique des données**_ (class store data)

> _**Calcule le OHLC**_ (Donne le court d'ouverture de la période le Max du prix sur la pèriode, le min et le close (cour à la fermeture).

> A chaque insert dans une table, fait un select sur toute la table pour le stocker dans un json (class Store DATA). 

> Un handler de get met à disposition ce JSON.(class main)

> A chaque insert, envoi une "photo" au scanner (module alert qui enverra les sms/what's app ect..) (class core)

> A chaque insert, stocke une "photo" de la bdd pour que les diffèrentes fonctions n'aient pas à faire de SELECT en bdd pour choper leurs infos (class contenaire et main)

- ##### Scanner: 
> _**Handler de post**_ recevant tte les données envoyées par la MotherApp (class main) 

> Ouvre _**10 threads**_ avec 10 fois le même worker pour faire le même calcul sur les données (_**POUR PLUS TARD**_: afin de faire les _**calcules pour les alertes**_)
- ##### userManager
> Une bdd contenant une table login/password, table settings et une table stratégie (contient les indicateurs utilisés par l'user pour faire ces calcules et la string de condition pour faire le calcul)

#### 2° <span style="color:#354458"> Base de Donnée
Actuellement _**19 tables en bdd**_
_**10 tables**_ sur les _**tickers**_ (infos sur les monnaies)
_**9 tables**_ sur les _**globe**_ (infos global du marché -> % de bitcoin en circulation, Nbr de monnaies dans API-CMC etc ...)
_**Globe et tickers**_ sont **_relié par la FK date-heure_**

### <span style="color:#29ABA4"> Modifications à éffectuer sur l'architecture Microservice
#### <span style="color:#354458"> Ajout d'une Gateway
Roles :
- Récupére l'ensemble des requêtes clients (a check si compatible websocket)
- Sécurise (check la taille des données, vérifit les infos)
- Redirige les actions pour qu'elles soient menées par le microservice concerné (Aura pour l'instant à contacter le microservice MotherApp et userManager)
### <span style="color:#29ABA4"> Autres Modifications
#### 1° <span style="color:#354458"> A corriger sur la version actuelle
- [ ] Règler les problèmes de décalage (optimiser le temps)
- [ ] Changer la partie de code qui regarde l'heure toutes les millisecond pour savoir si on est à une minute. La remplacer par une méthode intern à Python (en gros optimiser la class core)
### <span style="color:#29ABA4"> Fonctionnalitées à Ajouter
#### <span style="color:#354458"> MicroService userManager
- [ ] Retravailler la bdd
- [ ] Grosse partie vérification sur la string de condition pour faire le calcul (qui sera directement injéctée en tant que code python)
#### <span style="color:#354458"> MicroService Gateway
- [ ] Handlers sur l'ensemble des requêtes clients
- [ ] Sécurité :
  - Check la taille des données
  - Check les infos
- [ ] Redirige les actions pour qu'elles soient menées par le microservice concerné
  - A contacter le microservice MotherApp
  - userManager)

#### <span style="color:#354458"> MicroService MotherApp
###### Actuellement Rien

___
___
