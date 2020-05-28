# getChipDamages
```js
getChipDamages(chip, leek, strictMode);
```
!!! info "getChipDamages(_Nombre_ chip, _Nombre_ leek, _Booléen_ strictMode) --> _Nombre_ damages"
    Retourne les dégâts qu'occasionnera l'utilisation de la puce **chip** sur le poireau **leek**. Toutes les 
    résistances de la cible et votre force actuelle sont pris en compte.
    
    __Paramètres__
    
    * chip : La puce qui va être utilisée.
    * leek : L'id du poireau ciblé par la puce __chip__.
    * strictMode : Vrai si vous souhaitez être certain à 100% que la puce tue l'ennemi, ou faux si vous admettez une
    marge d'erreur (aléatoire des dégâts).
    
    __Retour__
    
    * damages : Le montant des dégâts qui sera infligé.
    
    __Opérations variables__
    
!!! warning "Note importante"
    Pour calculer les dégâts de la puce, la moyenne des dégâts est utilisée. Il se peut donc que cette fonction renvoie
    un nombre et que la puce n'occasionne pas le même montant de dégâts.  
    Si vous souhaitez être certain d'occasionner au minimum les dégâts retournés, utilisez le strict mode, en passant 
    ce paramètre à true.
    
    _Exemple : Puce Caillou (**CHIP_PEBBLE**), inflige 2 à 34 de dégâts et a une moyenne de 18 de dégâts._

!!! example "Exemple d'utilisation"
    Vous pouvez calculer si votre puce va infliger des dégâts afin de savoir si elle vaut le coup de l'utiliser.
    
```js
var nearestEnemy = getNearestEnemy();
if (getChipDamages(CHIP_SPARK, nearestEnemy, false) > 0) {
    useChip(CHIP_SPARK, nearestEnemy);
}
```

```js
var nearestEnemy = getNearestEnemy();
if (getChipDamages(CHIP_SPARK, nearestEnemy, true) > 0) { // On s'assure qu'on ne tapera jamais 0.
    useChip(CHIP_SPARK, nearestEnemy);
}
```



