# POUR COMMENCER

Cette librairie a été écrite par Kaikina, actuellement jouant sous le pseudo `tgirou`.
Pour tout signalements de [bugs](https://github.com/Kaikina/LeekWars/issues "Issues"), ou 
d'[améliorations](https://github.com/Kaikina/LeekWars/pulls "Pull Requests"), merci d'utiliser les outils Github 
dédiés.

## Installation

### Installation de la dépendance AccessibleCells

Créez une nouvelle IA dans LeekWars et nommez-là de la manière souhaitée. Il est recommandé de la nommer 
`AccessibleCells`. Copiez le contenu de cette 
[librairie](https://raw.githubusercontent.com/Kaikina/LeekWars/master/AccessibleCells.js "AccessibleCells.js") dans 
l'IA que vous venez de créer.

### Installation de la librairie Kailib

Créez une nouvelle IA dans le même répertoire que sa dépendance 
[AccessibleCells](#installation-de-la-dependance-accessiblecells). Nommez-la de la manière souhaitée. Il est recommandé
de la nommer `Kailib`. Copiez le contenu de cette
[librairie](https://raw.githubusercontent.com/Kaikina/LeekWars/master/Kailib.js "Kailib.js") dans l'IA que vous venez
de créer.

## Usage

Dans l'IA principale de votre poireau, importez la 
[librairie principale](#installation-de-la-librairie-kailib).
```js
include("Kailib");
```
Vous pouvez maintenant utiliser n'importe quelle fonction de la librairie au sein de l'IA de votre poireau. Exemple :
```js
var hasTalked = false;
if (getAliveEnemiesCount() < 1) {
	sayFinisher();
	hasTalked = true;
}
```
