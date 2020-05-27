# getLessHealthLeek
```js
getLessHealthLeek(leeks);
```
!!! info "getLessHealthLeek(_TableauDeNombres_ leeks) --> _Nombre_ leek"
    Retourne l'id du poireau ayant le moins de vie parmi les poireaux **leeks**.
    
    __Paramètres__
    
    * leeks : Les ids des poireaux à analyser.
    
    __Retour__
    
    * leek : L'id du poireau ayant le moins de vie.
    
    __Opérations variables__
    
!!! example "Exemple d'utilisation"
    Vous pouvez récupérer l'allié qui a le moins de vie afin de le soigner en priorité.
    
```js
var allies = getAlliesInRange(13,  getCell());
var allyToHeal = getLessHealthLeek(allies);
```



