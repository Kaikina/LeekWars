# getMoves
```js
getMoves(cell, mp);
```
!!! info "getMoves(_Nombre_ cell, _Nombre_ mp) --> _TableauDeNombres_ cells"
    Retourne un tableau de cellules ateignables depuis la cellule __cell__  avec un nombre de points de mouvements __mp__.
    Les cellules contenant des obstacles ou des leeks ne sont pas retournées.
    
    __Paramètres__
    
    * cell : La cellule à partir de laquelle rechercher des cellules disponibles.
    * mp : Le nombre de points de mouvements disponibles.
    
    __Retour__
    
    * cells : Le tableau contenant les ids de toutes les cellules atteignables depuis la cellule __cell__.  
    
    __Opérations variables__

!!! warning "Attention"
    Afin de faire fonctionner cette fonction il faut absolument placer tout en haut de votre IA, après l'import de la
    librairie le code ci-dessous.
    
```js
if ( getTurn() === 1 ) {
    init();
} 
beginTurn();
```

!!! example "Exemple d'utilisation"
    Vous pouvez récupérer toutes les cellules où votre poireau peut se rendre afin de calculer plus tard les cellules 
    où vous pourrez vous cacher.
    
```js
var availableCells = getMoves(getCell(), getMP());
```



