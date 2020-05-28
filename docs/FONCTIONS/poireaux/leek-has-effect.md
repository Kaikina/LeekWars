# leekHasEffect
```js
leekHasEffect(leek, effectType);
```
!!! info "leekHasEffect(_Nombre_ leek, _Nombre_ effectType) --> _Booléen_ hasEffect"
    Détermine si le poireau **leek** a un effet de type **effectType**.
    
    __Paramètres__
    
    * leek : L'id du poireau à analyser.
    * effectType : Le type d'effet à rechercher.
    
    __Retour__
    
    * hasEffect : _vrai_ si le poireau **leek** possède un effet de type **effectType**.
    
    __Opérations variables__
    
!!! example "Exemple d'utilisation"
    Vous pouvez vérifier si un poireau a un poison ou un débuf sur lui pour le clean de ses effets.
    
```js
var allyHasPoison = leekHasEffect(EFFECT_POISON,  getNearestAlly());
```



