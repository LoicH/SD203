"use strict";


/*
 * Module qui génère et gère les objets Student.
 * Fonctions visibles : 
 *  - constructor
 */
var MODULE_STUDENT = (function(){
    function Student(name, firstName, id)
    {
        this.name = name;
        this.firstName = firstName;
        this.id = id;
    }
    
    /* Renvoie une chaîne de caractères dans le format  
     * « student: May, Letitia, 544 »
     */
    Student.prototype.toString = function()
    {
        return `student: ${this.name}, ${this.firstName}, ${this.id}`;
    };

    /*
     * Affiche la représentation de l'objet Student.
     */
    Student.prototype.print = function()
    {
        console.log(this.toString());
    };

    return {
        constructor : Student
    };
})() ;


//Pour tester : 
//~ var testStudent = new MODULE_STUDENT.constructor("Dupond", "Jean", 1835);
//~ testStudent.print();

/*
 * Module qui gère les objets étudiants étrangers : ForeignStudent
 * Fonctions visibles : 
 *  - constructor
 */
var MODULE_FOREIGN_STUDENT = (function() {
    function ForeignStudent(name, firstName, id, nationality)
    {
        this.name = name;
        this.firstName = firstName;
        this.id = id;
        this.nationality = nationality;
    }
    
    //"Héritage"
    ForeignStudent.prototype = new MODULE_STUDENT.constructor();

    /* Renvoie une chaîne de caractères dans le format  
     * « student: May, Letitia, 544, French »
     */
    ForeignStudent.prototype.toString = function(){
        return MODULE_STUDENT.constructor.prototype.toString.call(this) 
        + `, ${this.nationality}`;
    };

    /*
     * Affiche la représentation de l'objet ForeignStudent.
     */
    ForeignStudent.prototype.print = function(){
        console.log(this.toString());
    };
    
    return {
        constructor : ForeignStudent
        };
})();


//Pour tester : 

//~ var testForeignStudent = new MODULE_FOREIGN_STUDENT.constructor("Langlet", "Louis", 345, "Francais");
//~ testForeignStudent.print();


/*
 * Module qui gère les objets Promotion.
 * Fonctions visibles : 
 *  - Promotion
 */

var MODULE_PROMOTION = (function(){
    var fs = require('fs'); //Manipulation de fichierss

    function Promotion() {this.students = [];}
    
    /*
     * Ajoute un étudiant à la fin de la promotion.
     */
    Promotion.prototype.add = function (student){
        this.students.push(student);
    };
    
    /*
     * Supprime un étudiant, affiche un message d'erreur s'il n'est pas trouvé.
     */
    Promotion.prototype.remove = function (student){
        var index = this.students.indexOf(student);
        if (index > -1){
            this.students.splice(index,1);
        }
        else {
            console.log("Student not found, nothing to be done.");
        }
    };
    
    /*
     * Affiche un message pour lister les étudiants.
     */
    Promotion.prototype.list = function (){
        console.log("Listing the students:");
        this.students.forEach(function(item, index, array){
            console.log(`Student n°${index+1}:`);
            item.print();
        });
        console.log("Done listing");
    };
    
    /*
     * Rajoute la représentation JSON de l'objet promotion à la fin du fichier
     * passé en argument.
     * Ne réécrit pas par dessus les fichiers.
     */
    Promotion.prototype.saveToFile = function (name){
        fs.appendFile(name, JSON.stringify(this.students), (err) => {
            if (err) throw err; });
    };
    
    /*
     * Rajoute l'objet JSON trouvé dans le fichier à la fin de la promotion.
     * N'écrase pas l'objet Promotion.
     */
    Promotion.prototype.readFromFile = function (name){
        var that = this; 
        //Pas très élégant mais c'est le seul moyen que j'ai trouvé
        //d'accéder à la fonction add, cf ci dessous
        
        fs.readFile(name, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log('Reading JSON file');
            var studentArray = JSON.parse(data);
            studentArray.forEach(function(obj){
                var student;
                if(obj.hasOwnProperty('nationality')){
                    student = new MODULE_FOREIGN_STUDENT.constructor(obj.name, obj.firstName, obj.id, obj.nationality);
                }
                else{
                    student = new MODULE_STUDENT.constructor(obj.name, obj.firstName, obj.id);
                }
            
            that.add(student); //La finalité du bricolage de début.
            });
            console.log("Done reading"); 
});
    };
    
    return {
        Promotion : Promotion
    };
})();


//Pour tester : 


//~ var testPromo = new MODULE_PROMOTION.Promotion();
//~ testPromo.add(testStudent);
//~ testPromo.add(testForeignStudent);
//~ testPromo.remove(testStudent);
//~ testPromo.remove(testStudent);

//~ testPromo.list();
//~ testPromo.saveToFile('testPromo.json');




//~ testPromo.readFromFile('input_promo.json');

//~ console.log("First listing:");
//~ testPromo.list(); //N'affiche rien chez moi, sans doute un problème de synchronisation

//Pour pouvoir lister  :
//~ setTimeout(function(){console.log("Second listing:");
//~ testPromo.list();}, 5);

