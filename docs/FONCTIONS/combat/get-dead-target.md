# getDeadTarget
```js
getDeadTarget(leeks, item, strictMode);
```
!!! info "getDeadTarget(_TableauDeNombres_ leeks, _Nombre_ item, _Booléen_ strictMode) --> _Nombre_ leek"
    Retourne l'id du poireau parmi les poireaux **leeks** pouvant mourir si l'item **item** est utilisé sur lui.
    
    __Paramètres__
    
    * leeks : Les ids des poireaux à analyser.
    * item : L'arme ou la puce à utiliser.
    * strictMode : Vrai si vous souhaitez être certain à 100% que le poireau retourné sera tué, ou faux si vous 
    admettez une marge d'erreur (aléatoire des dégâts).
    
    __Retour__
    
    * leek : L'id d'un poireau qui peut être tué.
    
    __Opérations variables__

!!! warning "À savoir"
    Les invocations sont ignorées dans le calcul.

!!! example "Exemple d'utilisation"
    Vous pouvez déterminez quelle cible prioriser parmi un groupe d'ennemis.
    
```js
var enemies = getEnemiesInRange(13,  getCell());
var enemyToKill = getDeadTarget(enemies, CHIP_ICEBERG, false);
```

```js
var enemies = getEnemiesInRange(13,  getCell());
var enemyToKill = getDeadTarget(enemies, CHIP_ICEBERG, true); // On s'assure que le poireau sera tué, quoi qu'il arrive.
```



