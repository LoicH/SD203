# Rendu du TP n°1:

## Pour tester le code :
J'ai ajouté des bouts de code pour tester l'exécution des scripts, ils sont désactivés (commentés) par défaut. Ils sont reconnaissables par la façon de commenter : « __//~__ ».


## Remarques sur l'exercice 2 :

Pour résoudre cet exercice j'ai utilisé la fonction __Array.prototype.includes__ qui n'est pas activée par défaut dans NodeJS, il faut exécuter ce script avec « nodejs --harmony_array_includes » pour pouvoir utiliser cette fonction. Je n'ai pas redéfini cette fonction par souci de lisibilité.

## Remarques sur l'exercice 3 :

Utilise aussi __Array.prototype.includes__, donc à exécuter avec « nodejs --harmony_array_includes »
Fichier d'exemple de promotion : __input_promo.json__.

Dans __input_testPromo.json__, les nationalités sont sous la forme "From Laos"
C'est ce que j'ai trouvé de plus simple pour générer des JSON conséquents avec [http://www.json-generator.com/](http://www.json-generator.com/)

J'ai rencontré un problème pour lire une promotion depuis un fichier JSON, puis pour l'afficher, les actions ne sont pas effectuées dans l'ordre par NodeJS. J'ai dû rajouter une pause dans l'exécution du script :

	testPromo.readFromFile('input_promo.json'); 

	console.log("First listing:")
	testPromo.list(); //N'affiche rien chez moi, sans doute un problème de synchronisation

	//Pour pouvoir lister  :
	setTimeout(function(){console.log("Second listing:");
	testPromo.list();}, 5);
