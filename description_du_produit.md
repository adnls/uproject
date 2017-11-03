# <span style="color:#___354458"> Description du <span style="color:#F17D80">Produit

> Nous proposons de produire une _``application web``_ (Web App) capable d'_``envoyer des alertes de ventes et d'achats``_ sur les _``cryptomonnais``_ calculées grâce à un algorithme plus ou moins précisément _``définit par l'utilisateur``_.
___
> L'utilisateur a le choix de _`recevoir des alertes`_ directement _**calculées**_ grâce un _**`algorithme`**_ par défaut. De plus, il _**peut définir lui même son propre algorithme**_ de manière plus ou moins assisté.

> Il peut de plus _**choisir les informations complémentaires qu'il souhaite recevoir**_ dans son message d'alerte.

> Faire un phrase avec les différentes parties de l'algo expert
___
___

# <span style="color:#354458"> Définition de l'algorithme
> _**Deux filtres**_ commun à tous le monde:
- Selection des monnaies
- Selection des échelles de temps

### <span style="color:#29ABA4"> 1° Le mode facile
#### <span style="color:#60047A"> Séléction des monnaies
Il peux séléctionner un top (max top 50) ou choix de 20 cryptomonnaies ciblés
#### <span style="color:#60047A"> Période de temps (Fréquence de threads)
Veut-il faire à long terme ou court terme (nous décidons pour lui)
La frèquence courte peut impliquer plus d'alerte.
#### <span style="color:#60047A"> Indicateur central:
MACD d'office
#### <span style="color:#60047A"> Description du message:
Pas de possibilité de personalisation du message.
___
### <span style="color:#29ABA4"> 2° Le mode avancé
#### <span style="color:#60047A"> Séléction des monnaies
Il peux séléctionner un top (max top 50) ou choix de 20 cryptomonnaies ciblés
#### <span style="color:#60047A"> Période de temps (Fréquence de threads)
Période de temps nommé dans un onglet déroulant (a choisir). 
Il pourra choisir deux échelles de temps.
#### <span style="color:#60047A"> Indicateur Central:
Pourra choisir un indicateur central entre :
- MACD (à définir)
- Moyenne mobile simple (à définir)
- Moyenne mobile exponentiel (à définir)
On pourra choisir directement sa valeur.
#### <span style="color:#60047A"> Autres Indicateurs
Aura le droit à un include entre
- Google Trends
- Global Info
- Autres Indicateurs (Bande de Bollinger, ADX, R de Williams)
#### <span style="color:#60047A"> Description du message:
Possibilité de personaliser le message.
___
### <span style="color:#29ABA4"> 3° Le mode expert
#### <span style="color:#60047A"> Séléction des monnaies
Il peux séléctionner un top (max top 50) ou choix de 20 cryptomonnaies ciblés
#### <span style="color:#60047A"> Période de temps (Fréquence de threads)
Période de temps nommé dans un onglet déroulant (a choisir). 
Il pourra choisir deux échelles de temps.
#### <span style="color:#60047A"> Indicateur Central:
> _**Différenciation**_ entre _**signal de vente**_ et _**signal d'achat**_. 

Pourra choisir plusieurs indicateurs centraux (à la carte, plus de notion d'indicateur central unique autour duquel tourne les autres indicateurs) pour la vente et un pour l'achat (pourra être le même ou non). Il est possible de _**donner la valeur des paramètres des indicateurs**_.

- L'indicateur central, choix du court ou du long : 
  - Le court: potentiellement des _**alertes plus précose**_ mais aussi potentiellement _**plus de fausses alertes**_.
  - Le long: potentiellement _**plus safe**_.

#### <span style="color:#60047A"> Autres Indicateurs
Possibilité de configurer les autes indicateurs. 
- Exemple Google Trends:
  - Si le google trends est en hausse
- Exemple l'Info Global:
  - Si le % marketCap du bitcoin est en augmentation/diminution
- Exemple Autres Indicateurs:
  - Si il y a un signal Bande de Bollinger dans les 15 dernières minutes
  - Si l'ADX est dans le vert
  - Si le R de Williams est en zone de survente
#### <span style="color:#60047A"> Description du message:
Possibilité de personaliser le message.
___

