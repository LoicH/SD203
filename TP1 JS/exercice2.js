"use strict";


//Exécuter avec nodejs --harmony_array_includes

/*Question 2a: écrivez une fonction 'countWords' qui, pour chaque mot d'une chaine de caractères, compte le nombre d'occurences de ce mot dans cette chaine. La fonction retournera une sructure données contenant ces résultats et permettant facilement d'obtenir le nombre d'occurences d'un mot donné. On s'assurera que cette fonction fonctionne sur une chaine de caractères d'au moins 500 mots, contenant potentiellement de la ponctuation.
*/

/**
 * Fonction retournant un array où les clés sont les mots et les valeurs associées aux clés
 * sont les occurences respectives des mots dans le texte.
 */
function countWords(text)
{
    function isWord(str) //renvoie si str est un mot (s'il contient un caractère alphanumérique)
    {
        return str.match(/\w/);
    }
    var occurences = [];
    var words = text.split(/\b/); //'\b' correspond aux séparateurs des mots.
    words = words.filter(isWord); //On supprime tous les éléments qui sont des ponctuations et autres.
    var alreadySeen = [];
    for(var word; word=words.pop();)
    {
        console.log(word);
        if (alreadySeen.includes(word))
        {
            occurences[word] += 1;
        }
        else
        {
            alreadySeen.push(word);
            occurences[word] = 1;
        }
    }

    return occurences;
}



//Pour tester : 

//~ var t = "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him. The hallway smelt of boiled cabbage and old rag mats. At one end of it a colored poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a meter wide: the face of a man of about forty-five, with a heavy black mustache and ruggedly handsome features. Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours. It was part of the economy drive in preparation for Hate Week. The flat was seven flights up, and Winston, who was thirty-nine, and had a varicose ulcer above his right ankle, went slowly, resting several times on the way. On each landing, opposite the lift shaft, the poster with the enormous face gazed from the wall. It was one of those pictures which are so contrived that the eyes follow you about when you move. BIG BROTHER IS WATCHING YOU, the caption beneath it ran.";

//~ console.log('Affiche des occurences');
//~ console.log(countWords(t));
//~ console.log('Affiche des occurences fini.');
//Ne marche pas très bien avec l'unicode...


/*Question 2b: écrivez un constructeur 'WordList' qui prend en entrée une chaine de caractères et qui retourne un objet avec les méthodes suivantes: 'maxCountWord()' (resp. 'minCountWord()') qui retourne le mot avec le plus grand (resp. faible) nombre d'occurences, getWords() qui retourne un tableau des mots (sans doublons) présents dans le texte initial, et 'getCount(word)' qui donne le nombre d'occurence pour un mot donné.
*/

function WordList(text)
{
    /**
     * Fonction auxiliaire qui trouve la propriété de l'object qui maximise f.
     */
    function best(object, f)
    {
        var actualBest = Object.keys(object)[0];
        for(var propertyName in object)
        {
            if(f(object[propertyName]) > f(object[actualBest]))
            {
                actualBest = propertyName;
            }
        }
        return actualBest;
    }

    this.occurences = countWords(text);

    this.maxCountWord = function()
    {
        return best(this.occurences, function(x){ return x;});
    };

    this.minCountWord = function()
    {
        return best(this.occurences, function(x){ return -x;});
    };

    this.getWords = function()
    {
        return Object.keys(this.occurences);
    };

    this.getCount = function(word)
    {
        return this.occurences[word];
    };
}

//Pour tester : 

//~ var A = new WordList(t);
//~ console.log(`Mot le plus fréquent : "${A.maxCountWord()}"", trouvable ${A.getCount(A.maxCountWord())} fois`);
//~ console.log(`Mot le moins fréquent : "${A.minCountWord()}"", trouvable ${A.getCount(A.minCountWord())} fois`);

/*Question 2c: ajouter à WordList une méthode 'applyWordFunc()' permettant d'appliquer une fonction quelconque à chaque mot et de retourner un tableau des résultats.
*/

WordList.prototype.applyWordFunc = function(f)
{
    return Object.keys(this.occurences).map(function(prop)
    {
        return f(prop);
    });
};


//~ console.log('Mettons tous les mots du texte en majuscule : ');
//~ console.log(A.applyWordFunc(function(x){return x.toUpperCase();}));
//~ console.log('Changement de casse fini.');

/*Question 2d: appeler la méthode 'applyWordFunc' avec une fonction anonyme retournant pour chaque mot un objet avec comme propriétés: son nombre d'occurence et sa longueur.
*/
//~ console.log("Affichons pour chaque mot, son nombre d'occurences et sa longueur");
//~ console.log(A.applyWordFunc(function(x)
//~ {
    //~ return {
		//~ mot : x,
        //~ occurences:A.getCount(x),
        //~ longueur:x.length
    //~ };
//~ }));


