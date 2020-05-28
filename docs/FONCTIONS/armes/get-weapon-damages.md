# getWeaponDamages
```js
getWeaponDamages(weapon, leek, strictMode);
```
!!! info "getWeaponDamages(_Nombre_ weapon, _Nombre_ leek, _Booléen_ strictMode) --> _Nombre_ damages"
    Retourne les dégâts qu'occasionnera l'utilisation de l'arme **weapon** sur le poireau **leek**. Toutes les 
    résistances de la cible et votre force actuelle sont pris en compte.
    
    __Paramètres__
    
    * weapon : L'arme qui va être utilisée.
    * leek : L'id du poireau ciblé par la puce __chip__.
    * strictMode : Vrai si vous souhaitez être certain à 100% que la puce tue l'ennemi, ou faux si vous admettez une
    marge d'erreur (aléatoire des dégâts).
    
    __Retour__
    
    * damages : Le montant des dégâts qui sera infligé.
    
    __Opérations variables__
    
!!! warning "Note importante"
    Pour calculer les dégâts de l'arme, la moyenne des dégâts est utilisée. Il se peut donc que cette fonction renvoie
    un nombre et que l'arme n'occasionne pas le même montant de dégâts.  
    Si vous souhaitez être certain d'occasionner au minimum les dégâts retournés, utilisez le strict mode, en passant 
    ce paramètre à true.
    
    _Exemple : Arme Magnum (**WEAPON_MAGNUM**), inflige 25 à 40 de dégâts et a une moyenne de 32.5 de dégâts._

!!! example "Exemple d'utilisation"
    Vous pouvez calculer si votre arme va infliger des dégâts afin de savoir si elle vaut le coup de l'utiliser.
    
```js
var nearestEnemy = getNearestEnemy();
var myWeapon = getWeapon();
if (getWeaponDamages(myWeapon, nearestEnemy, false) > 0) {
    useWeapon(myWeapon, nearestEnemy);
}
```

```js
var nearestEnemy = getNearestEnemy();
var myWeapon = getWeapon();
if (getWeaponDamages(myWeapon, nearestEnemy, true) > 0) { // On s'assure qu'on ne tapera jamais 0.
    useWeapon(myWeapon, nearestEnemy);
}
```



