#TP serveur

##Préambule :
Concernant JSHint, les seules erreurs que j'ai sont :

`Use the function form of "use strict".` que je choisis de ne pas corriger
puisque mes scripts ne seront pas concatenés ou inclus dans d'autres
scripts, je préfère ne pas rajouter 

	(function () {
	   'use strict';
	...
	}());
	
et ainsi éviter de rajouter un niveau d'indentation, avec un risque de 
m'embrouiller dans les parenthèses/accolades.

---
J'ai aussi :

`'require' is not defined.` ou `'console' is not defined.` ou 
`'process' is not defined.` car je n'ai pas défini le mode "node" pour 
que JShint soit informé que je travaille dans l'environnement NodeJS.



##Exercice 1

###Question b)
cf le commentaire dans le code :

	/*
     * Nous avons ici la partie synchrone/asynchrone.
     * Le serveur demande au module 'fs' de lire un fichier.
     * Si on lui demande de manière synchrone : 'fs.readFileSync(...)',
     * alors le serveur bloque tout en attendant le retour de
     * la fonction. Cependant, si comme ici on utilise 
     * 'fs.readFile(...)', alors le serveur peut continuer à traiter
     * des requêtes pendant que 'fs' lit le fichier. 
     */
     
###Question c)
Comme on récupère l'entrée de l'utilisateur ('?name=input'), et qu'on 
l'insère directement dans le code HTML de la page, l'utilisateur peut 
rentrer de code malicieux pour modifier la page, notamment du code HTML/
JS/PHP.

###Question d)
Si un utilisateur rentre du code malicieux, tous les autres utilisateurs
auront leur page d'accueil modifiée car le serveur enregistre et affiche
l'historique des connexions.
Ainsi si un utilisateur rentre 'name=<script>alert('coucou');</script>',
tous les autres futurs utilisateurs verront une popup s'afficher.
Encore pire, si un utilisateur malicieux envoie plusieur fois une requête
pour faire afficher une popup aux autres utilisateurs (assez facile, il 
suffit de faire un script Python par exemple qui envoie 100 fois une 
requête vers "http://[site]/?name=<script>alert('coucou');</script>"), 
alors les autres utilisateurs verront des popup s'afficher à l'infini 
s'ils ne désactivent pas ces popups d'une manière.

Pour corriger la vulnérabilité XSS, je transforme chaque caractère de 
l'entrée en "caractère spécial" HTML : "abc" devient "&#97&#98&#99".
Ainsi, le navigateur affiche bien tous les caractères, mais le déboguage
est un peu plus compliqué, étant donné que ce format est difficile à lire.


##Exercice 2:

###Question c)

J'ai réutilisé les méthodes pour échapper les caractères venant de l'entrée
utilisateur, je n'ai pas de problème au niveau des injections XSS.

###Questiond d)

Ici l'entrée est déjà echappée, donc pas besoin d'utiliser une fonction
faite maison pour s'occuper de ça.
Attention, si on ne réinitialise pas le fichier 'log.html', il va conserver
les anciens utilisateurs, mais au format échappé, ainsi les noms ne vont 
pas s'afficher correctement.



