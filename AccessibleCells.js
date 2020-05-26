/*
*   Bundle de fonctions permettant de récupérer les cases accessibles pour un coût très
*   faible (1000ops maximum pour 3MP, 40kops pour l'intégralité de la map)
*   Accessible niveau 21 de manière optimisée, 16 de manière moins opti, une version 
*   level 5 fonctionne en solo
*/

global _cells = [];
global _voisins = [];
global _enemies = [];

/*
*   @brief Initialise le cache des obstacles et des voisins
*   A ne lancer qu'une seule fois en début de partie !
*   @level 5 ou 21
*/
function init(){
    var current;

    for(var i in getObstacles()) {
        _cells[i] = true;
    }
        
    for(var i = 0; i < 613; ++i) {
        if(_cells[i]) continue;
        current = i + 17;
        _voisins[i] = [];
        if(getCellDistance(i, current) === 1) {
            if(!_cells[current]) {
                push(_voisins[i], current);
            }
        }
        current = i - 17;
        if(getCellDistance(i, current) === 1) {
            if(!_cells[current]) {
                push(_voisins[i], current);
            }
        }       
        current = i + 18;
        if(getCellDistance(i, current) === 1) {
            if(!_cells[current]) {
                push(_voisins[i], current);
            }
        }
        current = i - 18;
        if(getCellDistance(i, current) === 1) {
            if(!_cells[current]) {
                push(_voisins[i], current);
            }
        }
    }
}

/*
*   @brief Met à jour le cache de position des ennemis
*   A ne lancer qu'une fois en début de tour !
*   @level 16
*/
function beginTurn() {
    _enemies = [];
    for(var i in getAliveEnemies()) {
        _enemies[getCell(i)] = true;
    }
}

/*
*   @brief Retourne toutes les cases accessibles depuis une cellule donnée avec un 
*   certain nombre de MP
*   Nécessite d'avoir utilisé les fonctions init et beginTurn pour fonctionner 
*   correctement
*   @level 1
*   @param origin La cellule depuis laquelle le déplacement commence
*   @param radius Le nombre de MP à notre disposition
*   @return Un tableau associatif de la forme cellule -> distance
*/
function getArea(@origin, @radius){
    var i = 0, toCheck = [origin], dist = 0, tmp, cells = [origin: -1];
    
    while(dist < radius) {
        // on récupère les voisins de tous les elements à checker
        ++dist;
        tmp = count(toCheck);
        while(i < tmp) {
            for(var k in _voisins[toCheck[i]]) {
                // on regarde si ce voisin n'a jamais été vu
                if(!cells[k] && !_enemies[k]) {
                    push(toCheck, k);
                    cells[k] = dist;
                }
            }
            ++i;
        }
    }
    
    cells[origin] = 0;
    
    return @cells;
}
