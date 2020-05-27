# getAlliesInRange
```js
getAlliesInRange(range, cell);
```
!!! info "getAlliesInRange(_Nombre_ range, _Nombre_ cell) --> _TableauDeNombres_ alliesInRange"
    Retourne un tableau contenant les ids des alliés étant à une portée **range** depuis la cellule **cell**.
    
    __Paramètres__
    
    * range : La portée dans laquelle chercher.
    * cell : La cellule depuis laquelle chercher.
    
    __Retour__
    
    * enemiesInRange : Le tableau contenant les ids des alliés étant à portée depuis la cellule.
    
    __Opérations variables__
    
!!! example "Exemple d'utilisation"
    Vous pouvez récupérer tous les alliés à portée pour ensuite décider sur lequel concentrer vos soins/boosts.
    
```js
var allies = getAlliesInRange(13,  getCell());
```



