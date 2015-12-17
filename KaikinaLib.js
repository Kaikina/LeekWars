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
177 opérations

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
177 opérations

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

function getLessResistanceTarget(enemies, chip)
{
	var damageTaken = 0;
	var target = null;
	for (var enemy in enemies)
	{
		if (calcChipDamages(chip, enemy) > damageTaken)
		{
			target = enemy;
			damageTaken = calcChipDamages(chip, enemy);
		}
	}
	return target;
}

function getLessHealthTarget(enemies)
{
	var lessHealth = 9999;
	var target = null;
	for (var enemy in enemies)
	{
		if (getLife(enemy) < lessHealth)
		{
			target = enemy;
			lessHealth = getLife(enemy);
		}
	}
	return target;
}

function getDeadTarget(enemies, chip)
{
	for (var enemy in enemies)
	{
		if (chipWillKill(chip, enemy)) return enemy;
		else return null;
	}
}

/* 
Fonction gestBestChipTarget(mode, range, chip)
Niveau 38
205 opérations

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
	var enemies = getEnemiesInRange(range, getLeek());
	if (mode == "LESS_RESISTANCE") return getLessResistanceTarget(enemies, chip);
	if (mode == "LESS_HEALTH") return getLessHealthTarget(enemies);
	if (mode == "DEAD") return getDeadTarget(enemies, chip);
}
