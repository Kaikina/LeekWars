# chipWillKill
```js
chipWillKill(chip, leek, strictMode);
```
!!! info "chipWillKill(_Nombre_ chip, _Nombre_ leek, _Booléen_ strictMode) --> _Booléen_ willKill"
    Détermine si l'usage de la puce __chip__ va tuer le poireau d'id __leek__. Toutes les résistances de l'ennemi et 
    votre force actuelle sont pris en compte.
    
    __Paramètres__
    
    * chip : La puce qui va être utilisée.
    * leek : L'id du poireau ciblé par la puce __chip__.
    * strictMode : Vrai si vous souhaitez être certain à 100% que la puce tue l'ennemi, ou faux si vous admettez une
    marge d'erreur (aléatoire des dégâts).
    
    __Retour__
    
    * willKill : _vrai_ si le poireau __leek__ sera tué.
    
    __Opérations variables__
    
!!! warning "Note importante"
    Pour calculer les dégâts de la puce, la moyenne des dégâts est utilisée. Il se peut donc que cette fonction renvoie
    **true** et que la puce ne tue pas l'ennemi si vous sortez un jet de dégâts inférieur à la moyenne de dégâts.  
    Si vous souhaitez être certain de tuer l'ennemi quoi qu'il arrive, utilisez le strict mode, en passant ce paramètre
    à true.
    
    _Exemple : Puce Caillou (**CHIP_PEBBLE**), inflige 2 à 34 de dégâts et a une moyenne de 18 de dégâts._

!!! example "Exemple d'utilisation"
    Vous pouvez calculer si votre puce peut tuer l'ennemi afin de ne pas vous soigner inutilement.
    
```js
var nearestEnemy = getNearestEnemy();
if (chipWillKill(CHIP_ROCK, nearestEnemy, false)) { // On admet une marge d'erreur liée à l'aléatoire des dégâts.
    useChip(CHIP_ROCK, nearestEnemy);
}
```

```js
var nearestEnemy = getNearestEnemy();
if (chipWillKill(CHIP_ROCK, nearestEnemy, true)) { // On ne permet aucune erreur possible quant au résultat.
    useChip(CHIP_ROCK, nearestEnemy);
}
```



