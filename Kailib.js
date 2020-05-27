include("CasesAccessibles");

/**
 * Returns if the usage of a chip on a leek will kill it.
 * Opérations variables.
 *
 * @param chip that will be used.
 * @param leek to use the chip on.
 * @returns {boolean} that will be true if the chip will kill the leek.
 */
function chipWillKill(chip, leek, strictMode)
{
	return getChipDamages(chip, leek, strictMode) > getLife(leek);
}

/**
 * Returns if the usage of a weapon on a leek will kill it.
 * Opérations variables.
 *
 * @param weapon that will be used.
 * @param leek to use the weapon on.
 * @returns {boolean} that will be true if the weapon will kill the leek.
 */
function weaponWillKill(weapon, leek, strictMode)
{
	return getWeaponDamages(weapon,  leek, strictMode) > getLife(leek);
}

/**
 * Returns an array of all enemies in range from a cell.
 * Opérations variables.
 *
 * @param range in which to search enemies.
 * @param cell from where to search enemies.
 * @returns {[]} if no enemies found or an array of all enemies found.
 */
function getEnemiesInRange(range, cell)
{
	var enemiesInRange = [];
	for (var enemy in getAliveEnemies())
		if (getCellDistance(getCell(enemy), cell) <= range) {
			push(enemiesInRange, enemy);
		}
	return enemiesInRange;
}

/**
 * Returns an array of all allies in range from a cell.
 * Opérations variables.
 *
 * @param range in which to search allies.
 * @param cell from where to search enemies.
 * @returns {[]}
 */
function getAlliesInRange(range, cell)
{
	var alliesInRange = [];
	for (var ally in getAliveAllies())
		if (getCellDistance(getCell(ally), cell) <= range) push(alliesInRange, ally);
	return alliesInRange;
}

/**
 * Returns if a unit has an effect of a type.
 * Opérations variables.
 *
 * @param leek to check.
 * @param effectType to find.
 * @returns {boolean} if the leek has an effect of the type.
 */
function leekHasEffect(leek, effectType)
{
	for (var effect in getEffects(leek)) {
		if (effect[0] === effectType) {
			return true;
		}
	}
	return false;
}

/**
 * Returns the damages that a chip can make on a leek.
 * Opérations variables.
 *
 * @param chip to use.
 * @param leek to target.
 * @param strictMode true to get the minimum damages it will do.
 * @returns {number} the damages that will cause the chip to the leek.
 */
function getChipDamages(chip, leek, strictMode)
{
	var chipStats = getChipEffects(chip);
	var chipDamages = 0;
	if (strictMode) {
		chipDamages = chipStats[0][1];
	} else {
		chipDamages = (chipStats[0][2] + chipStats[0][1]) / 2;
	}
	return (round(chipDamages * (1 + getStrength() / 100)) *
		(1 - getRelativeShield(leek) / 100) - getAbsoluteShield(leek));
}

/**
 * Returns the damages that a weapon can make on a leek.
 * Opérations variables.
 *
 * @param weapon to use.
 * @param leek to target.
 * @param strictMode true to get the minimum damages it will do.
 * @returns {number} the damages that will cause the weapon on the leek.
 */
function getWeaponDamages(weapon, leek, strictMode)
{
	var weaponStats = getWeaponEffects(weapon);
	var weaponDamages = 0;
	if (strictMode) {
		weaponDamages = weaponStats[0][1];
	} else {
		weaponDamages = (weaponStats[0][2] + weaponStats[0][1]) / 2;
	}
	var totalDamages = 0;
	for (var i = 0; i < count(weaponStats); i++) {
		totalDamages += round(weaponDamages * (1 + getStrength() / 100)) * (1 - getRelativeShield(leek) / 100) - getAbsoluteShield(leek);
	}
	return totalDamages;
}

/**
 * Return the leek that has the less health.
 * Opérations variables.
 *
 * @param leeks to analyze.
 * @returns {null|number} the leek that has the less health.
 */
function getLessHealthLeek(leeks)
{
	var lessHealth = 9999;
	var target = null;
	for (var leek in leeks)
	{
		if (getLife(leek) < lessHealth && !isSummon(leek))
		{
			target = leek;
			lessHealth = getLife(leek);
		}
	}
	return target;
}

/**
 * Returns a leek from an array of leeks that can be killed by an item.
 * @param enemies to analyze.
 * @param item that will be used to hit.
 * @returns {number|null} the id of the leek that can die.
 */
function getDeadTarget(enemies, item, strictMode)
{
	if (isChip(item))
	{
		for (var enemy in enemies)
		{
			if (chipWillKill(item, enemy, strictMode) && !isSummon(enemy)) return enemy;
			else return null;
		}
	}
	else if (isWeapon(item))
	{
		for (var enemy in enemies)
		{
			if (weaponWillKill(item, enemy, strictMode) && !isSummon(enemy)) return enemy;
			else return null;
		}
	}
	else return null;
}

/*
Fonction autoHeal()
Niveau 9
3870 opérations

Utilise vos puces de soin de façon optimale.

Paramètres :

Retour :

	- Renvoie [0] si une puce de soin a été utilisée. Sinon, [null].
*/
function autoHeal()
{
	// Soin final = (Soin de base) × (1 + Sagesse / 100)
	var chips = getChips();
	var tp = getTP();
	if(inArray(chips, CHIP_REGENERATION))
	{
		var chipStats = getChipEffects(CHIP_REGENERATION);
		var chipHeal = (chipStats[0][1]);
		if (getLife() + (chipHeal * (1 + getWisdom() / 100)) <= getTotalLife()) useChip(CHIP_REGENERATION, getLeek());
	}
	if(inArray(chips, CHIP_VACCINE))
	{
		if (getLife() / getTotalLife() * 100 < 60) useChip(CHIP_VACCINE, getLeek());
	}
	if(inArray(chips, CHIP_CURE))
		if (35 * (1 + getWisdom() / 100) <= getTotalLife() - getLife()) useChip(CHIP_CURE, getLeek());
	if(inArray(chips, CHIP_BANDAGE))
		if (getLife() < getTotalLife()) useChip(CHIP_BANDAGE, getLeek());
	return (getTP() < tp) ? 0 : null;
}

/*
Fonction DDD()
Niveau 35
2082 opérations

Déni un défi délibérément

Paramètres :

Retour :

*/
function DDD()
{
	if (getFightContext() == FIGHT_CONTEXT_CHALLENGE)
	{
		var enemiesCells = [];
		for (var enemy in getAliveEnemies())
			push(enemiesCells, getCell(enemy));
		moveAwayFromCells(enemiesCells);
		autoHeal();
		say("Nope.");
		lama();
		while(getTP() > 0) show(randInt(0, 318));
	}
}

/*
Fonction useSimpleChip(item, target)
Niveau 37
Opérations variables

Utilise une puce [item] de zone point sur la cible [target].

Paramètres :

	- item : L'id de la puce à utiliser
	- target : L'id de l'ennemi sur lequel utiliser la puce

Retour :

	Renvoie la valeur [state] de useChip(chip, leek). Si il est impossible de lancer la puce, renvoie [-1].

*/
function useSimpleChip(item, target)
{
	var state;
	if (getPathLength(getCell(), getCellToUseChip(item, target)) <= getMP())
	{
		moveTowardCell(getCellToUseChip(item, target));
		state = useChip(item, target);
		return state;
	}
	else return -1;
}

/*
Fonction useSimpleWeapon(item, target)
Niveau 37
Opérations variables

Utilise une arme [item] de zone point sur la cible [target].

Paramètres :

	- item : L'id de l'arme à utiliser
	- target : L'id de l'ennemi sur lequel utiliser la puce

Retour :

	Renvoie la valeur [state] de useWeapon(leek). Si il est impossible de tirer, renvoie [-1].

*/
function useSimpleWeapon(item, target)
{
	var state;
	var cellsToUseWeapon = getCellsToUseWeapon(item, target);
	var distance = 400;
	if (cellsToUseWeapon == null) return -1;
	for (var i = 0; i < count(cellsToUseWeapon); i++) {
		var computedDistance = getPathLength(getCell(), cellsToUseWeapon[i]);
		if (computedDistance < distance) distance = computedDistance;
	}
	if (distance <= getMP())
	{
		if (getWeapon() != item) setWeapon(item);
		moveTowardCells(cellsToUseWeapon);
		state = useWeapon(target);
		return state;
	}
	else return -1;
}


/*
Fonction getCellToUseAoEWeapon(item, target, start, mp)
Niveau 39
Opérations variables

Renvoie la meilleure cellule sur laquelle utiliser une arme de zone 4.

Paramètres :

	- item : L'id de l'arme à utiliser
	- target : L'id de l'ennemi sur lequel utiliser l'arme en priorité
	- start : La cellule où se trouve le poireau qui tire
	- mp : Le nombre de MP dont dispose le tireur

Retour :

	Renvoie la meilleure cellule [bestCell]. Renvoie [-1] si aucune cellule n'a été trouvée.

*/
function getCellToUseAoEWeapon(item, target, start, mp)
{
	var efficiency = [];
	var score = 0;
	for (var cell2 = 0; cell2 < 613; ++cell2)
	{
		if (getCellDistance(start, cell2) >= (getWeaponMinRange(item) - mp) && getCellDistance(start, cell2) <= (getWeaponMaxRange(item) + mp) && !isObstacle(cell2))
		{
			var targetsAffected = getWeaponTargets(item, cell2);
			for (var leek in targetsAffected)
			{
				if (isAlly(leek))
				{
					score -= 2;
				}
				else if (isEnemy(leek))
				{
					score += 1;
				}
			}
		}
		if (score > 0)
		{
			efficiency[cell2] = score;
		}
		score = 0;
	}
	var bestCell = -1;
	var maxScore = 0;
	for (var cell : var eff in efficiency)
	{
		if (efficiency[cell] > maxScore)
		{
			maxScore = efficiency[cell];
			bestCell = cell;
		}
	}
	var pathLength = getPathLength(start, getCellToUseWeaponOnCell(item, getCell(target)));
	if (pathLength != null && pathLength <= mp)
	{
		var targetsAffected = getWeaponTargets(item, getCell(target));
		for (var leek in targetsAffected)
		{
			if (isAlly(leek) && leek != getLeek())
			{
				score -= 2;
			}
			else if (isEnemy(leek))
			{
				score += 1;
			}
		}
		if (score >= maxScore) bestCell = getCell(target);
	}
	return bestCell;
}

/*
Fonction useAoEWeapon(item, target)
Niveau 39
Opérations variables

Utilise une arme de zone 4 au meilleur endroit possible.

Paramètres :

	- item : L'id de l'arme à utiliser
	- target : L'id de l'ennemi sur lequel utiliser l'arme en priorité

Retour :

	Renvoie l'état [state] de la fonction useWeaponOnCell(cell).

*/
function useAoEWeapon(item, target)
{
	if (getCellDistance(getCell(), getCell(target)) <= getWeaponMaxRange(item) + 2 + (getMP()) && getTP() >= getWeaponCost(item))
	{
		var state;
		var bestCell = getCellToUseAoEWeapon(item, target, getCell(), getMP());
		if (bestCell != -1 && bestCell != null && getTP() >= getWeaponCost(item))
		{
			moveTowardCell(getCellToUseWeaponOnCell(item, bestCell));
			if (getWeapon() != item) setWeapon(item);
			state = useWeaponOnCell(bestCell);
			return state;
		}
		else return -1;
	}
}

/*
Fonction getCellToUseLaserWeapon(item, target, start, mp)
Niveau 39
Opérations variables

Renvoie la meilleure cellule sur laquelle utiliser une arme de zone laser.

Paramètres :

	- item : L'id de l'arme à utiliser
	- target : L'id de l'ennemi sur lequel utiliser l'arme en priorité
	- start : La cellule où se trouve le poireau qui tire
	- mp : Le nombre de MP dont dispose le tireur

Retour :

	Renvoie la meilleure cellule [bestCell]. Renvoie [-1] si aucune cellule n'a été trouvée.

*/
function getCellToUseLaserWeapon(item, target, start, mp)
{
	var cellsToUseWeapon = getCellsToUseWeapon(item, target);
	var realCellsToUseWeapon = [];
	for (var cell in cellsToUseWeapon)
		if (getPathLength(start, cell) <= mp) push(realCellsToUseWeapon, cell);
	var efficiency = [];
	var score = 0;
	for (var cell in realCellsToUseWeapon)
	{
		var targetsAffected = getWeaponTargets(cell);
		for (var leek in targetsAffected)
		{
			if (isAlly(leek))
			{
				score -= 2;
			}
			else if (isEnemy(leek))
			{
				score += 1;
			}
		}
		if (score > 0)
		{
			efficiency[cell] = score;
		}
		score = 0;
	}
	var bestCell = -1;
	var maxScore = 0;
	for (var cell : var eff in efficiency)
	{
		if (efficiency[cell] > maxScore)
		{
			maxScore = efficiency[cell];
			bestCell = cell;
		}
	}
	return bestCell;
}

/*
Fonction useLaserWeapon(item, target)
Niveau 39
Opérations variables

Utilise une arme de zone laser au meilleur endroit possible.

Paramètres :

	- item : L'id de l'arme à utiliser
	- target : L'id de l'ennemi sur lequel utiliser l'arme en priorité

Retour :

	Renvoie l'état [state] de la fonction useWeaponOnCell(cell).

*/
function useLaserWeapon(item, target)
{
	if (getCellDistance(getCell(), getCell(target)) <= getWeaponMaxRange(item) + getMP() && getTP() >= getWeaponCost(item))
	{
		var bestCell = getCellToUseLaserWeapon(item, target, getCell(), getMP());
		if (bestCell != -1)
		{
			if (getWeapon() != item) setWeapon(item);
			moveTowardCell(getCellToUseWeaponOnCell(bestCell));
			var state = useWeaponOnCell(bestCell);
			return state;
		}
	}
}

/*
Fonction useAoEChip(item, target)
Niveau 39
Opérations variables

Utilise une puce de zone 4 au meilleur endroit possible.

Paramètres :

	- item : L'id de la puce à utiliser
	- target : L'id de l'ennemi sur lequel utiliser la puce en priorité

Retour :

	Renvoie l'état [state] de la fonction useChipOnCell(cell).

*/
function useAoEChip(item, target)
{
	if (getCellDistance(getCell(), getCell(target)) <= getChipMaxRange(item) + 2 + (getMP()) && getTP() >= getChipCost(item))
	{
		var state;
		var bestCell = getCellToUseAoEChip(item, target, getCell(), getMP());
		if (bestCell != -1 && bestCell != null)
		{
			var cells = getCellsToUseChipOnCell(item, bestCell);
			var cellToMove = 0;
			for (var i = 0; i < count(cells); i++) {
				if (cells[i] != bestCell && getPathLength(getCell(), cells[i]) <= getMP() && getPathLength(cells[i], bestCell) >= getChipArea(item) - 2) {
					cellToMove = cells[i];
					break;
				}
			}
			debug(getPathLength(getCell(), cellToMove) + ' > ' + getMP());
			if (getPathLength(getCell(), cellToMove) > getMP() - 1) return -1;
			moveTowardCell(cellToMove);
			state = useChipOnCell(item, bestCell);
			return state;
		}
		else return -1;
	}
}

/*
Fonction getCellToUseAoEChip(item, target, start, mp)
Niveau 39
Opérations variables

Renvoie la meilleure cellule sur laquelle utiliser une puce de zone 4.

Paramètres :

	- item : L'id de la puce à utiliser
	- target : L'id de l'ennemi sur lequel utiliser la puce en priorité
	- start : La cellule où se trouve le poireau qui utilise la puce
	- mp : Le nombre de MP dont dispose le lanceur

Retour :

	Renvoie la meilleure cellule [bestCell]. Renvoie [-1] si aucune cellule n'a été trouvée.

*/
function getCellToUseAoEChip(item, target, start, mp)
{
	var efficiency = [];
	var score = 0;
	for (var cell2 = 0; cell2 < 613; ++cell2)
	{
		if (getCellDistance(start, cell2) >= (getChipMinRange(item) - mp) && getCellDistance(start, cell2) <= (getChipMaxRange(item) + mp) && !isObstacle(cell2))
		{
			var targetsAffected = getChipTargets(item, cell2);
			for (var leek in targetsAffected)
			{
				if (leek == getLeek()) {
					return -1;
				}
				else if (isAlly(leek))
				{
					score -= 2;
				} else if (cell2 == getCell(leek) && isEnemy(leek)){
					score += 2;
				}
				else if (isEnemy(leek))
				{
					score += 1;
				}
			}
		}
		if (score != 0)
		{
			efficiency[cell2] = score;
		}
		score = 0;
	}
	var bestCell = -1;
	var maxScore = 0;
	for (var cell : var eff in efficiency)
	{
		if (efficiency[cell] > maxScore)
		{
			maxScore = efficiency[cell];
			bestCell = cell;
		}
	}
	var pathLength = getPathLength(getCell(), getCellToUseChipOnCell(item, getCell(target)));
	if (pathLength != null && pathLength <= mp)
	{
		var targetsAffected = getChipTargets(item, getCell(target));
		for (var leek in targetsAffected)
		{
			if (isAlly(leek) && leek != getLeek())
			{
				score -= 2;
			}
			else if (isEnemy(leek))
			{
				score += 1;
			}
		}
		if (score >= maxScore) bestCell = getCell(target);
	}
	return bestCell;
}

/*
Fonction use(item, target)
Niveau 39
Opérations variables

Utilise un objet [item] sur une cible [target].

Paramètres :

	- item : L'id de l'objet à utiliser
	- target : L'id de l'ennemi sur lequel utiliser l'objet

Retour :

*/
function use(item, target)
{
	if (isWeapon(item))
	{
		if (getWeaponArea(item) == AREA_CIRCLE_2 || getWeaponArea(item) == AREA_CIRCLE_1 || getWeaponArea(item) == AREA_CIRCLE_3) return useAoEWeapon(item, target);
		if (getWeaponArea(item) == AREA_POINT) return useSimpleWeapon(item, target);
		if (getWeaponArea(item) == AREA_LASER_LINE) return useLaserWeapon(item, target);
	}
	if (isChip(item))
	{
		if(getChipArea(item) == AREA_POINT) return useSimpleChip(item, target);
		if(getChipArea(item) == AREA_CIRCLE_2 || getChipArea(item) == AREA_CIRCLE_1 || getChipArea(item) == AREA_CIRCLE_3) return useAoEChip(item, target);
	}
}

/*
Fonction getMaxEnemyRange(target)
Niveau 57
Opérations variables

Renvoie la portée maximale à laquelle l'ennemi [target] peut vous faire du mal.

Paramètres :

	- target : L'id de l'ennemi

Retour :

	- Renvoie la portée maximale [maxRange]. Renvoie [0] si l'ennemi ne possède rien qui puisse vous faire du mal.
*/
function getMaxEnemyRange(target)
{
	var dangerousEffects = [EFFECT_DAMAGE, EFFECT_DEBUFF, EFFECT_INVERT, EFFECT_KILL, EFFECT_POISON, EFFECT_SHACKLE_MAGIC, EFFECT_SHACKLE_MP, EFFECT_SHACKLE_STRENGTH, EFFECT_SHACKLE_TP];
	var maxRange = 0;
	var dangerousChips = [];
	for (var chip in getChips(target))
	{
		for (var effect in getChipEffects(chip))
			if (inArray(dangerousEffects, effect[0]))
				dangerousChips[chip] = getChipMaxRange(chip);
	}
	var dangerousWeapons = [];
	for (var weapon in getWeapons(target))
	{
		for (var effect in getWeaponEffects(weapon))
			if (inArray(dangerousEffects, effect[0]))
				dangerousWeapons[weapon] = getWeaponMaxRange(weapon);
	}
	for (var chip : var range in dangerousChips)
	{
		if (range > maxRange) maxRange = range;
	}
	for (var weapon : var range in dangerousWeapons)
	{
		if (range > maxRange) maxRange = range;
	}
	return maxRange;
}

/*
Fonction getCellsToHide()
Niveau 57
Opérations variables

Renvoie un tableau contenant les cellules disponibles pour se cacher de l'ennemi le plus proche.

Paramètres :


Retour :

	- Renvoie un tableau [cellsToHide] contenant les cellules pour se cacher.
*/
function getCellsToHide()
{
	var cellsToGo = getArea(getCell(), getMP()); //On récupère les cellules accessibles
	var enemyCellsToGo = getArea(getCell(getNearestEnemy()), getMP(getNearestEnemy())); //On récupère les cellules accessibles de l'ennemi
	var cellsToHide = [];
	var enemyMaxRange = getMaxEnemyRange(getNearestEnemy());
	for (var cell : var distance in cellsToGo) //On insère dans le tableau cellsToHide les cellules où l'on peut se cacher
	{
		var safe = true;
		for (var cell2 : var distance2 in enemyCellsToGo)
		{
			if (lineOfSight(cell, cell2, (getAliveAllies() + getAliveEnemies())) && getCellDistance(cell, cell2) <= enemyMaxRange)
			{
				safe = false;
				break;
			}
		}
		if (safe) push(cellsToHide, cell);
	}
	return cellsToHide;
}

function getCellsToUseWeaponFrom(weapon, cell, leek)
{
	var cells = [];
	for (var i = 0; i < 613; i++)
	{
		if (getPathLength(cell, i) + 1 <= getWeaponMaxRange(weapon) && lineOfSight(cell, i, leek))
			push(cells, i);
	}
	return cells;
}

function canUseWeaponFromCell(weapon, cell, availableCells) {
	if (isInlineWeapon(weapon)) {
		for (var i = 0; i < count(availableCells); i++) {
			var distance = getPathLength(cell, availableCells[i]);
			if (lineOfSight(availableCells[i], cell) && distance <= getWeaponMaxRange(weapon) && isOnSameLine(availableCells[i], cell)) {
				return true;
			}
		}
	} else {
		for (var i = 0; i < count(availableCells); i++) {
			var distance = getPathLength(cell, availableCells[i]);
			if (lineOfSight(availableCells[i], cell) && distance <= getWeaponMaxRange(weapon)) {
				return true;
			}
		}
	}
	return false;
}

function isAoEChip(chip) {
	var chipArea = getChipArea(chip);
	var isChipAoe = false;
	if (chipArea >= 3 && chipArea <= 5) return true;
	return false;
}

function canUseChipFromCell(chip, cell, availableCells, leek) {
	var isChipAoe = isAoEChip(chip);
	var cellToUseAoEChip = 0;
	if (isChipAoe) cellToUseAoEChip = getCellToUseAoEChip(chip,  getLeekOnCell(cell),  getCell(leek),  getMP(leek));
	if (isInlineChip(chip)) {
		for (var i = 0; i < count(availableCells); i++) {
			var distance = getPathLength(cell, availableCells[i]);
			if (isChipAoe && availableCells[i] == cellToUseAoEChip) return true;
			if (lineOfSight(availableCells[i], cell) && distance <= getChipMaxRange(chip) && isOnSameLine(availableCells[i], cell)) {
				return true;
			}
		}
	}
	for (var i = 0; i < count(availableCells); i++) {
		var distance = getPathLength(cell, availableCells[i]);
		if (chipNeedLos(chip)) {
			if (lineOfSight(availableCells[i], cell) && distance <= getChipMaxRange(chip)) {
				return true;
			}
		} else {
			if (distance <= getChipMaxRange(chip)) {
				return true;
			}
		}
	}
	return false;
}

function getCellsToUseChipFrom(chip, cell, leek)
{
	var cells = [];
	for (var i = 0; i < 613; i++)
	{
		if (getPathLength(cell, i) + 1 <= getChipMaxRange(chip) && lineOfSight(cell, i, leek))
			push(cells, i);
	}
	return cells;
}

function hasChip(leek, chip) {
	var leekChips = getChips(leek);
	if (leekChips != null) {
		for (var i = 0; i < count(leekChips); i++)
			if (leekChips[i] == chip) return true;
	}
	return false;
}

/**
 * Returns an array of reachable cells from a cell with a number of movement points. It won't send cells that contains
 * leeks or obstacles.
 * Opérations variables.
 *
 * @param cell cell from where to find reachable cells.
 * @param mp the number of movement points that can be used.
 * @returns {[]} An array of reachable cells from a cell with a number of movement points.
 */
function getMoves(cell, mp)
{
	var area = getArea(cell, mp);
	var availableCells = [];
	for (var cell1 : var distance in area) {
	push(availableCells, cell1);
}
	return (availableCells);
}

function sayShit()
{
	var punchlines = ["Ne me fais pas poireauter !",
		"Fais pas ton coeur de poireau !",
		"Ne tombe pas dans les poireaux !",
		"Ton IA me fend le poireau !",
		"Tu ne vaux même pas un poireau !",
		"Les poireaux sont cuits !", //5
		"Un poireau, ça se combat !",
		"Être un poireau est un combat !",
		"Le poireau est le légume du combat !",
		"Qui combat Kaikina sera vaincu !",
		"L'art est avant tout un combat de poireaux !", //10
		"La civilisation combat la bêtise, mais cultive les poireaux !",
		"Là où le combat est grand, le poireau l'est aussi !",
		"Qui combat trop le poireau, devient poireau lui-même !",
		"Le poireau qui s'enfuit du combat, est un poireau qui peut resservir !",
		"Un poireau qui atteint la sérénité est un poireau qui a fui le combat !", //15
		"Le poireau combat et c'est le farmer qui porte les galons !",
		"Le seul vrai combat d'un poireau l'oppose à sa lâcheté !",
		"L'art de la guerre c'est de soumettre le poireau sans combat !",
		"Si ce sont toujours les meilleurs qui partent en premier, pourquoi suis-je toujours là ?", //20
		"Je ne cautionne pas la chirurgie végétale, mais dans ton cas, fonce !",
		"Pourquoi tu ne te glisserais pas dans quelque chose de plus confortable ? Comme un état végétatif par exemple ?",
		"Dis-moi, être un mauvais développeur est une profession ou c'est naturel chez toi ?",
		"Si je dis quelque chose qui t'offense, dis-le moi, comme ça je pourrai te le redire !",
		"Pas besoin d'insultes, ton poireau en dit long !", //25
		"Les leekzombies mangent les IAs, tu es sain et sauf !",
		"Quand je regarde mon IA, je me trouve mauvais. Mais quand je vois ton poireau, je me sens chanceux !",
		"Tout le monde à le droit d'avoir une mauvaise IA, mais tu abuses de ce privilège !",
		"Qu'est-ce que serait une bonne IA sans des mauvaises ? Tu vois à quel point t'es important !",
		"Puis-je t'emprunter ton IA pour montrer l'exemple à ne pas suivre ?",
		"Une IA c'est bien, tu devrais essayer d'en avoir une !",
		"J'essaye de t'imaginer avec une bonne IA !"];
	var i =randInt(0, count(punchlines));
	say(punchlines[i]);
}

function sayFinisher()
{
	var punchlines = ["Et le combat cessa, faute de poireaux.",
		"Quand on a raté son IA, on essaye au moins de réussir sa mort.",
		"Ne combat jamais un poireau qui n'a rien à perdre.",
		"Ce n'est pas mon IA qui est meilleure, c'est juste que la tienne est plus mauvaise que les autres !",
		"Une mauvaise IA n'est pas un crime, tu es libre de partir !",
		"Wow je suis impressionné du temps que tu as pu vivre sans IA !",
		"OMAE WA MOU SHINDEIRU !",
		"J'ai terminé la récolte !'"]; //4
	var i = randInt(0, count(punchlines));
	say(punchlines[i]);
}

function getLeekMaxRange(leek, chipsToIgnore) {
	var chips = getChips(leek);
	var weapons = getWeapons(leek);
	var maxRange = 0;
	for (var i = 0; i < count(chips); i++) {
		var chipRange = getChipMaxRange(chips[i]);
		if (!inArray(chipsToIgnore, chips[i]) && chipRange > maxRange) {
			maxRange = chipRange;
		}
	}
	for (var i = 0; i < count(weapons); i++) {
		var weaponRange = getWeaponMaxRange(weapons[i]);
		if (weaponRange > maxRange) {
			maxRange = weaponRange;
		}
	}
	return maxRange;
}