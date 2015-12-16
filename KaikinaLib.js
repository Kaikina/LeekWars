/*
Fonction spellWillKill(chip, enemy)
Niveau 38
307 opérations

Renvoie si la puce [chip] peut tuer l'ennemi [enemy].

Paramètres :

	- chip : L'id de la puce à utiliser
	- enemy : L'id du leek sur lequel utiliser la puce

Retour :

	- Renvoie [true] si le poireau [enemy] est tuable avec la puce [chip]. Renvoie [false] dans le cas contraire.
*/
function spellWillKill(chip, enemy)
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
3562 opérations

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
