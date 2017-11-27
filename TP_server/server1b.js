"use strict";

var http = require("http");
  url = require("url"),
  path = require("path"),
  fs = require("fs");

console.log("Starting the server...");

http.createServer(function(request, response) {
    
  ///The end of the URL, after the address:port 
  var my_path = url.parse(request.url).pathname;
  
  ///The real path on the computer of the file requested
  var full_path = path.join(process.cwd(), my_path);
  
  
  var htmlToInsert = "<html>" +
      "<head>"  + 
      "<title>Welcome</title>"  + 
      "</head>"  + 
      "<body>";
  
  if(my_path == "/"){
    console.log("Client tried to acess the home page");
    response.writeHead(200, {"Content-Type": "text/html"});
    htmlToInsert += "<p>Server is working!</p>"+
      "</body></html>";
    response.write(htmlToInsert);
    response.end();
  }
  else {
    /*
     * Nous avons ici la partie synchrone/asynchrone.
     * Le serveur demande au module 'fs' de lire un fichier.
     * Si on lui demande de manière synchrone : 'fs.readFileSync(...)',
     * alors le serveur bloque tout en attendant le retour de
     * la fonction. Cependant, si comme ici on utilise 
     * 'fs.readFile(...)', alors le serveur peut continuer à traiter
     * des requêtes pendant que 'fs' lit le fichier. 
     */
    fs.readFile(full_path, "binary", function(err, file){
      if(err){
        console.log("Client tried to fetch an absent file: '"+my_path+"'.");
        response.writeHead(404, {"Content-Type": "text/html"});
        htmlToInsert += "<p> Erreur 404 : Le fichier est introuvable... </p>\n" +
          "</body>  </html>";
        response.write(htmlToInsert);
        response.end();
          
      }
      else{
        console.log("Client tried to fetch the following file: '"+my_path+"'.");        
        response.writeHeader(200);
        response.write(file, "binary");
        response.end();
      }
  });
      
      
  }

}).listen(8000);

console.log("Server is listening at http://localhost:8000");
