"use strict";

var http = require("http");
  url = require("url"),
  path = require("path"),
  fs = require("fs");

console.log("Starting the server...");

http.createServer(function(request, response) {
    
  ///The query containing the arguments in the query string 
  //I didn't have to use the 'unescape' or 'decodeURI' method.
  var query = url.parse(request.url, true).query;
  console.log("query = "+JSON.stringify(query));
  
  var text = '<html>' +  
    '<head>' +
    '<title>Welcome</title>' +
    '</head>' +
    '<body>'
  
  if (query !== null && query.hasOwnProperty('name')){
    if(query.name === ""){
      text += " &#9835 Hello, (...), Won't You Tell Me Your Name? &#9835";
    }
    else{
      text += "Hello "+query.name+"!";
    }
  }
  else{
    text += "Welcome, please give me your name.";
  }
  
  response.writeHead(200, {"Content-Type": "text/html"});
  text += '</body>' +
    '</html>'

  response.write(text);
  response.end();
  
    
  
}).listen(8000);

console.log("Server is listening at http://localhost:8000");
