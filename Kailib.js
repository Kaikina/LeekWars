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
	return calcChipDamages(chip, leek, strictMode) > getLife(leek);
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
	return calcWeaponDamages(weapon,  leek, strictMode) > getLife(leek);
}

/**
 * Returns an array of all enemies in range from a cell.
 * Opérations variables.
 *
 * @param range in which to search enemies.
 * @param cell from where to search enemies.
 * @returns {null|[]} if no enemies found or an array of all enemies found.
 */
function getEnemiesInRange(range, cell)
{
	var enemiesInRange = [];
	for (var enemy in getAliveEnemies())
		if (getCellDistance(getCell(enemy), cell) <= range) {
			push(enemiesInRange, enemy);
		}
	if (!isEmpty(enemiesInRange)) {
		return (enemiesInRange);
	}
	return null;
}

/*
Fonction getAlliesInRange(range, from) : alliesInRange
Niveau 16
Opérations variables

Renvoie un tableau contenant les alliés à portée [range] de la cellule [from].

Paramètres :

	- range : La portée sur laquelle vérifier la présence d'alliés exprimée en nombre de cellules
	- from : L'id de la cellule à partir de laquelle vérifier la présence d'alliés

Retour :

	- alliesInRange : Un tableau contenant la liste des id des alliés se situant à portée [range] de la cellule [from]. Renvoie [null] si aucun résultat n'a été trouvé.
*/
function getAlliesInRange(range, from)
{
	var alliesInRange = [];
	for (var ally in getAliveAllies())
		if (getCellDistance(getCell(ally), from) <= range) push(alliesInRange, ally);
	if (!isEmpty(alliesInRange))
		return (alliesInRange);
	else return (alliesInRange = null);
}
/*
Fonction unitHasEffect(unit)
Niveau 61
25 opérations

Renvoie si l'entité [unit] possède des effets.

Paramètres :

	- unit : L'id de l'entité

Retour :

	- Renvoie [true] si l'entité possède des effets, si non [false].
*/
function unitHasEffect(unit)
{
	if (getEffects(unit) != []) return true;
	else return false;
}

/*
Fonction unitHasEffectOfType(unit, effectType)
Niveau 61
26 opérations

Renvoie si l'entité [unit] possède des effets de type [effectType].

Paramètres :

	- unit : L'id de l'entité
	- effectType : L'id de l'effet

Retour :

	- Renvoie [true] si l'entité possède des effets de type [effectType], si non [false].
*/
function unitHasEffectOfType(unit, effectType)
{
	for (var effect in getEffects(unit))
	{
		if (effect[0] == effectType) return true;
		else return false;
	}
}

/*
Fonction calcChipDamages(chip, enemy)
Niveau 38
313 opérations

Renvoie le nombre de dégâts que peut occasionner la puce [chip] sur l'ennemi [enemy].

Paramètres :

	- chip : L'id de la puce
	- enemy : L'id du poireau

Retour :

	- Renvoie le montant de dégâts que peut occasionner la puce arrondi au plus proche sur une moyenne de dégâts.
*/
function calcChipDamages(chip, enemy, strictMode)
{
	var chipStats = getChipEffects(chip);
	var chipDamage = 0;
	if (strictMode) {
		chipDamage = chipStats[0][1];
	} else {
		chipDamage = (chipStats[0][2] + chipStats[0][1]) / 2;
	}
	return (round(chipDamage * (1 + getStrength() / 100)) * (1 - getRelativeShield(enemy) / 100) - getAbsoluteShield(enemy));
}

/*
Fonction calcWeaponDamages(weapon, enemy)
Niveau 38
313 opérations

Renvoie le nombre de dégâts que peut occasionner l'arme [weapon] sur l'ennemi [enemy].

Paramètres :

	- weapon : L'id de l'arme
	- enemy : L'id du poireau

Retour :

	- Renvoie le montant de dégâts que peut occasionner l'arme arrondi au plus proche sur une moyenne de dégâts.
*/
function calcWeaponDamages(weapon, enemy, strictMode)
{
	var weaponStats = getWeaponEffects(weapon);
	var weaponDamage = 0;
	if (strictMode) {
		weaponDamage = weaponStats[0][1];
	} else {
		weaponDamage = (weaponStats[0][2] + weaponStats[0][1]) / 2;
	}
	var totalDamages = 0;
	for (var i = 0; i < count(weaponStats); i++) {
		totalDamages += round((weaponStats[i][1] + weaponStats[i][2]) / 2 * (1 + getStrength() / 100)) * (1 - getRelativeShield(enemy) / 100) - getAbsoluteShield(enemy);
	}
	return totalDamages;
}

/*
Fonction getLessResistanceTarget(enemies, idDamages)
Niveau 38
Opérations variables

Renvoie la cible la moins résistante parmis les ennemis [enemies] avec l'objet [idDamages].

Paramètres :

	- enemies : Un tableau contenant les id des ennemis
	- idDamages : L'id de l'objet dont provient les dégâts

Retour :

	- Renvoi la cible [target] la moins résistante. Renvoie [null] si aucune cible n'est trouvée. Renvoie [null] si l'objet [idDamages] passé en paramètre est incorrect.
*/
function getLessResistanceTarget(enemies, idDamages)
{
	if (isChip(idDamages))
	{
		var chip = idDamages;
		var damageTaken = 0;
		var target = null;
		for (var enemy in enemies)
		{
			if (calcChipDamages(chip, enemy, false) > damageTaken && !isSummon(target))
			{
				target = enemy;
				damageTaken = calcChipDamages(chip, enemy, false);
			}
		}
		return target;
	}
	else if (isWeapon(idDamages))
	{
		var weapon = idDamages;
		var damageTaken = 0;
		var target = null;
		for (var enemy in enemies)
		{
			if (calcWeaponDamages(weapon, enemy, false) > damageTaken && !isSummon(target))
			{
				target = enemy;
				damageTaken = calcWeaponDamages(weapon, enemy, false);
			}
		}
		return target;
	}
	else return null;
}

/*
Fonction getLessHealthTarget(enemies)
Niveau 1
Opérations variables

Renvoie la cible avec le moins de vie parmis les enemis [enemies].

Paramètres :

	- enemies : Un tableau contenant les id des ennemis

Retour :

	- Renvoi la cible [target] avec le moins de vie. Renvoie [null] si aucune cible n'est trouvée.
*/
function getLessHealthTarget(enemies)
{
	var lessHealth = 9999;
	var target = null;
	for (var enemy in enemies)
	{
		if (getLife(enemy) < lessHealth && !isSummon(enemy))
		{
			target = enemy;
			lessHealth = getLife(enemy);
		}
	}
	return target;
}

/*
Fonction getDeadTarget(enemies, idDamages)
Niveau 1
Opérations variables

Renvoie la cible parmis les ennemis [enemies] qui sera tuée en utilisant l'objet [idDamages].

Paramètres :

	- enemies : Un tableau contenant les id des ennemis
	- idDamages : L'id de l'objet dont provient les dégâts

Retour :

	- Renvoi la cible [enemy] qui sera tué. Renvoie [null] si aucun ennemi ne peut être tué.
*/
function getDeadTarget(enemies, idDamages)
{
	if (isChip(idDamages))
	{
		var chip = idDamages;
		for (var enemy in enemies)
		{
			if (chipWillKill(chip, enemy, false) && !isSummon(enemy)) return enemy;
			else return null;
		}
	}
	else if (isWeapon(idDamages))
	{
		var weapon = idDamages;
		for (var enemy in enemies)
		{
			if (weaponWillKill(weapon, enemy, false) && !isSummon(enemy)) return enemy;
			else return null;
		}
	}
	else return null;
}

/*
Fonction getBestChipTarget(mode, range, chip)
Niveau 38
Opérations variables

Renvoie la meilleure cible à portée [range] sur laquelle utiliser la puce [chip] selon le mode de calcul [mode].

Paramètres :

	- mode : Le mode de calcul ("LESS_RESISTANCE" : La cible qui subira le plus de dégâts
								"LESS_HEALTH" : La cible avec le moins de vie
								"DEAD" : La cible qui peut se faire tuer
	- range : La portée à laquelle analyser les ennemis
	- chip : La puce à utiliser
Retour :

	- Renvoie l'id du poireau à portée [range] sur lequel utiliser la puce [chip] selon la méthode [mode]. Renvoie [null] si aucun poireau ne correspond.
*/
function getBestChipTarget(mode, range, chip)
{
	var enemies = getEnemiesInRange(range, getCell(getLeek()));
	if (enemies != null)
	{
		if (mode == "LESS_RESISTANCE") return getLessResistanceTarget(enemies, chip);
		if (mode == "LESS_HEALTH") return getLessHealthTarget(enemies);
		if (mode == "DEAD") return getDeadTarget(enemies, chip);
	}
	else return null;
}

/*
Fonction gestBestWeaponTarget(mode, range, weapon)
Niveau 38
Opérations variables

Renvoie la meilleure cible à portée [range] sur laquelle utiliser l'arme [weapon] selon le mode de calcul [mode].

Paramètres :

	- mode : Le mode de calcul ("LESS_RESISTANCE" : La cible qui subira le plus de dégâts
								"LESS_HEALTH" : La cible avec le moins de vie
								"DEAD" : La cible qui peut se faire tuer
	- range : La portée à laquelle analyser les ennemis
	- weapon : L'arme à utiliser
Retour :

	- Renvoie l'id du poireau à portée [range] sur lequel utiliser l'arme [weapon] selon la méthode [mode]. Renvoie [null] si aucun poireau ne correspond.
*/
function getBestWeaponTarget(mode, range, weapon)
{
	var enemies = getEnemiesInRange(range, getCell(getLeek()));
	if (enemies != null)
	{
		if (mode == "LESS_RESISTANCE") return getLessResistanceTarget(enemies, weapon);
		if (mode == "LESS_HEALTH") return getLessHealthTarget(enemies);
		if (mode == "DEAD") return getDeadTarget(enemies, weapon);
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