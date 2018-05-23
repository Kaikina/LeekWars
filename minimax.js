include("lib");
if ( getTurn() == 1 ) init();
if (!getWeapon()) setWeapon(WEAPON_PISTOL);
beginTurn();

//Empêcher les défis
if (getLeek())
	DDD();

//MINIMAX IMPLEMENTATION  (simple)

//Vars
var myCell = getCell();
var myMP = getMP();
var myWeapon = getWeapon();
var nearestEnemy = getNearestEnemy();
var enemyCell = getCell(nearestEnemy);
var enemyMP = getMP(nearestEnemy);
var cellsToHide = getCellsToHide();
mark(cellsToHide, COLOR_GREEN);
var cellsScore = [];
var weaponRange = getWeaponMaxRange(getWeapon());
var cases = 0;

//Bypass SPARK
var hasSpark = false;
var enemyChips = getChips(nearestEnemy);
for (var i = 0; i < count(enemyChips); i++)
	if (enemyChips[i] == CHIP_SPARK) hasSpark = true;
	
if (hasSpark)
{
	var sparkCell = getCellToUseWeapon(nearestEnemy);
	moveTowardCell(sparkCell);
}

//Bypass Match Nul
if (getTurn() > 10)
	moveToward(nearestEnemy);

//Obtenir tous nos déplacements possibles
function getMoves(myCell, myMP)
{
	var area = getArea(myCell, myMP);
	var availableCells = [];
	for (var cell : var distance in area)
		push(availableCells, cell); 
	return (availableCells);
}

var availableCells = getMoves(myCell, myMP);

//Obtenir tous nos tirs possibles
function getShoots(availableCells)
{
	var availableShootCells = [];
	var cells = [];
	for (var i = 0; i < count(availableCells); i++)
	{
		cells = getCellsToUseWeaponOnCell(availableCells[i]);
		for (var j = 0; j < count(cells); j++)
			push(availableShootCells, cells[j]);
	}
	return (availableShootCells);
}

var availableShootCells = getShoots(availableCells);

//Obtenir tous les déplacements possibles de notre ennemi
function getEnemyMoves(enemyCell, enemyMP)
{
	var enemyArea = getArea(enemyCell, enemyMP);
	var enemyAvailableCells = [];
	for (var cell : var distance in enemyArea)
		push(enemyAvailableCells, cell);
	return (enemyAvailableCells);
}

var enemyAvailableCells = getEnemyMoves(enemyCell, enemyMP);

//Obtenir tous les tirs possibles de notre ennemi
function getEnemyShoots(enemyAvailableCells)
{
	var enemyAvailableShootCells = [];
	var cells = [];
	for (var i = 0; i < count(enemyAvailableCells); i++)
	{
		cells = getCellsToUseWeaponOnCell(enemyAvailableCells[i]);
		for (var j = 0; j < count(cells); j++)
			push(enemyAvailableShootCells, cells[j]);
	}
	return (enemyAvailableShootCells);
}

var enemyAvailableShootCells = getEnemyShoots(enemyAvailableCells);

//Obtenir les scores de chaque scénario

for (var i = 0; i < count(availableCells); i++)
{
	var cells = [];
	cellsScore[availableCells[i]] = 0;
	cells = getCellsToUseWeaponFrom(myWeapon, availableCells[i], getLeek());
	for (var j = 0; j < count(cells); j++)
	{
		if (cells[j] == enemyCell)
		{
			cellsScore[availableCells[i]] += 2;
			var availableMP = myMP - getPathLength(myCell, availableCells[i]);
			for (var k = 0; k < count(cellsToHide); k++)
			{
				if (getPathLength(cellsToHide[k], availableCells[i]) <= availableMP)
					cellsScore[availableCells[i]] += 5;
				cases++;
			}
		}	
		cases++;
	}
	for (var k = 0; k < count(cellsToHide); k++)
	{
		if (cellsToHide[k] == availableCells[i])
			cellsScore[availableCells[i]]++;
		cases++;
	}
	for (var k = 0; k < count(enemyAvailableShootCells); k++)
	{
		if (availableCells[i] == enemyAvailableShootCells[k] && getPathLength(availableCells[i], myCell) == myMP)
		{
			cellsScore[availableCells[i]] -= 2;
			break;
		}
		cases++;
	}
	cases++;
}
//Déterminer quel scénario nous allons choisir
var maxi = -10;
var bestCell = 0;
for (var cell : var score in cellsScore)
{
	if (score > maxi) {
		maxi = score;
		bestCell = cell;
	}
}

//Effectuer le meilleur scénario
if (maxi > 1)
	moveTowardCell(bestCell);
while (useWeapon(nearestEnemy) > 0);
var minu = 613;
var bestCellToHide = 0;

enemyCell = getCell(nearestEnemy);
for (var i = 0; i < count(cellsToHide); i++)
{
	var distance = getPathLength(enemyCell, cellsToHide[i]);
	if (distance < minu)
	{
		minu = distance;
		bestCellToHide = cellsToHide[i];
	}
}

moveTowardCell(bestCellToHide);
	
say("Il y a ~" + cases + " façons de jouer ce tour-ci. Je choisis la meilleure grâce à mon algorithme Minimax simplifié.");
