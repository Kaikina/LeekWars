include("CasesAccessibles");

/* 
Fonction chipWillKill(chip, enemy)
Niveau 38
307 opérations

Renvoie si la puce [chip] peut tuer l'ennemi [enemy].

Paramètres : 

	- chip : L'id de la puce à utiliser
	- enemy : L'id du leek sur lequel utiliser la puce
	
Retour : 

	- Renvoie [true] si le poireau [enemy] est tuable avec la puce [chip]. Renvoie [false] dans le cas contraire.
*/ 
function chipWillKill(chip, enemy) 
{
	var chipStats = getChipEffects(chip);
	var chipDamage = (chipStats[0][2] + chipStats[0][1]) / 2;
	if ((chipDamage * (1 + getStrength() / 100)) * (1 - getRelativeShield(enemy) / 100) - getAbsoluteShield(enemy) >= getLife(enemy)) return true;
	else return false;
}

/* 
Fonction weaponWillKill(weapon, enemy)
Niveau 38
307 opérations

Renvoie si l'arme [weapon] peut tuer l'ennemi [enemy].

Paramètres : 

	- weapon : L'id de l'arme à utiliser
	- enemy : L'id du leek sur lequel utiliser l'arme
	
Retour : 

	- Renvoie [true] si le poireau [enemy] est tuable avec l'arme [weapon]. Renvoie [false] dans le cas contraire.
*/ 
function weaponWillKill(weapon, enemy)
{
	var weaponStats = getWeaponEffects(weapon);
	var weaponDamage = (weaponStats[0][2] + weaponStats[0][1]) / 2;
	if ((weaponDamage * (1 + getStrength() / 100)) * (1 - getRelativeShield(enemy) / 100) - getAbsoluteShield(enemy) >= getLife(enemy)) return true;
	else return false;
}

/* 
Fonction getEnemiesInRange(range, from) : enemiesInRange
Niveau 16
Opérations variables

Renvoie un tableau contenant les ennemis à portée [range] de la cellule [from].

Paramètres : 

	- range : La portée sur laquelle vérifier la présence d'ennemis exprimée en nombre de cellules
	- from : L'id de la cellule à partir de laquelle vérifier la présence d'ennemis
	
Retour : 

	- enemiesInRange : Un tableau contenant la liste des id des ennemis se situant à portée [range] de la cellule [from]. Renvoie [null] si aucun résultat n'a été trouvé.
*/ 
function getEnemiesInRange(range, from)
{
	var enemiesInRange = [];
	for (var enemy in getAliveEnemies())
		if (getCellDistance(getCell(enemy), from) <= range) push(enemiesInRange, enemy);
	if (!isEmpty(enemiesInRange))
		return (enemiesInRange);
	else return (enemiesInRange = null);
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
function calcChipDamages(chip, enemy)
{
	var chipStats = getChipEffects(chip);
	var chipDamage = (chipStats[0][2] + chipStats[0][1]) / 2;
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
function calcWeaponDamages(weapon, enemy)
{
	var weaponStats = getWeaponEffects(weapon);
	var weaponDamage = (weaponStats[0][2] + weaponStats[0][1]) / 2;
	return (round(weaponDamage * (1 + getStrength() / 100)) * (1 - getRelativeShield(enemy) / 100) - getAbsoluteShield(enemy));
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
			if (calcChipDamages(chip, enemy) > damageTaken && !isSummon(target))
			{
				target = enemy;
				damageTaken = calcChipDamages(chip, enemy);
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
			if (calcWeaponDamages(weapon, enemy) > damageTaken && !isSummon(target))
			{
				target = enemy;
				damageTaken = calcWeaponDamages(weapon, enemy);
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
			if (chipWillKill(chip, enemy) && !isSummon(enemy)) return enemy;
			else return null;
		}
	}
	else if (isWeapon(idDamages))
	{
		var weapon = idDamages;
		for (var enemy in enemies)
		{
			if (weaponWillKill(weapon, enemy) && !isSummon(enemy)) return enemy;
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
	var chips = getChips();
	var tp = getTP();
	if(inArray(chips, CHIP_BANDAGE))
		if (getLife() < getTotalLife()) useChip(CHIP_BANDAGE, getLeek());
	if(inArray(chips, CHIP_CURE))
		if (getLife() / getTotalLife() * 100 <= 30) useChip(CHIP_CURE, getLeek());
	if(inArray(chips, CHIP_VACCINE))
	{
		if (getLife() / getTotalLife() * 100 < 60) useChip(CHIP_VACCINE, getLeek());
		if (getCellDistance(getCell(), getCell(getNearestEnemy())) >= getMP() * 3 && getCellDistance(getCell(), getCell(getNearestEnemy())) <= getMP() * 5);
	}
	if(inArray(chips, CHIP_REGENERATION))
	{
		var chipStats = getChipEffects(CHIP_REGENERATION);
		var chipHeal = (chipStats[0][1]);
		if (getLife() + (chipHeal * (1 + getWisdom() / 100)) <= getTotalLife()) useChip(CHIP_REGENERATION, getLeek());
	}
	if(inArray(chips, CHIP_ARMORING))
	{
		if (getLife() / getTotalLife() * 100 <= 35) useChip(CHIP_ARMORING, getLeek());
	}
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
	if (getPathLength(getCell(), getCellToUseWeapon(item, target)) <= getMP())
	{
		if (getWeapon() != item) setWeapon(item);
		moveTowardCell(getCellToUseWeapon(item, target));
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
				moveTowardCell(getCellToUseChipOnCell(item, bestCell));
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
		if (getDistance(cell, i) <= getWeaponMaxRange(weapon) && lineOfSight(cell, i, leek))
			push(cells, i);
	}
	return cells;
}
