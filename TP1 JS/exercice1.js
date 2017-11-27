"use strict";


/**
Exercice 1 - Nombres, boucles, tableaux, fonctions et récursivité
*/
/**
 * Renvoie la factorielle d'un nombre entier naturel.
 * (Méthode itérative)
 */
function factorielIt(n)
{
  var produit = 1;
  for(var i = 2;i<=n;i++)
  {
    produit *= i;
  }
  return produit;
}

/**
 * Renvoie la factorielle d'un nombre entier naturel.
 * (Méthode récursive)
 */
function factorielRec(n)
{
  if(n<=1)
  {
    return 1;
  }
  else
  {
    return n*factorielRec(n-1);
  }
}

/**
 * Renvoie le tableau des éléments de tab, auxquels on a appliqué factorielRec.
 */
function factorielTableau(tab)
{
  var longueur = tab.length;
  var nouvTab = [];
  for(var i=0;i<longueur;i++)
  {
    nouvTab.push(factorielRec(tab[i]));
  }
  return nouvTab;
}

/**
 * Renvoie le tableau des éléments de tab, auxquels on a appliqué factorielRec.
 */
function factorielMap(tab)
{
  return tab.map(factorielRec);
}

//Pour tester :

//~ console.log(`1! = ${factorielIt(1)}`);
//~ console.log(`5! = ${factorielIt(5)}`);
//~ console.log(`5! = ${factorielRec(5)}`);
//~ var testing = [0, 1, 5, 10];
//~ var undef = [-1, -10, 5.5, 10.345];
//~ console.log(`factoriel(${testing}) = ${factorielTableau(testing)}`);
//~ console.log(`factoriel(${undef}) = ${factorielTableau(undef)}`);

