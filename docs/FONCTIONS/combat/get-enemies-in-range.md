# getEnemiesInRange
```js
getEnemiesInRange(range, cell);
```
!!! info "getEnemiesInRange(_Nombre_ range, _Nombre_ cell) --> _TableauDeNombres_ enemiesInRange"
    Retourne un tableau contenant les ids des ennemis étant à une portée **range** depuis la cellule **cell**.
    
    __Paramètres__
    
    * range : La portée dans laquelle chercher.
    * cell : La cellule depuis laquelle chercher.
    
    __Retour__
    
    * enemiesInRange : Le tableau contenant les ids des ennemis étant à portée depuis la cellule.
    
    __Opérations variables__
    
!!! example "Exemple d'utilisation"
    Vous pouvez récupérer tous les ennemis à portée pour ensuite décider sur lequel concentrer vos attaques.
    
```js
var enemies = getEnemiesInRange(13,  getCell());
```



