
"use strict";

var https = require("https"),
  url = require("url"),
  path = require("path"),
  fs = require("fs");
  
console.log("Starting the server...");

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

/**
 * Replace all chars with '&#xaa'. Useful for accents & XSS.
 */
function escapeAll(string) {
  var escapedChars = Array.prototype.map.call(string, function(char){
    return '&#' + char.charCodeAt();
  });
  return escapedChars.join('');
}

/**
 * Returns the HTML code for the users's history 
 * and appends the new user.
 * @param username The name of the user
 * @return a string of the HTML code to insert
 */
function appendAndRead(username){
  
  //We use Sync to avoid mixing writing & reading.
  var htmlHistory;
  try{
    htmlHistory = fs.readFileSync('log.html', 'utf8');
  } catch(err) {
    htmlHistory = "empty";
    console.log(err);
  }
  
  
    
      
      
    
    
      
      
    
  
  
  
  //Here we don't use Sync because we want to respond as quick as possible
  fs.appendFile('log.html', username + '<br>\n');
  return htmlHistory;
}


/**
 * Returns the HTML code to greet the user
 * @param query An object having the 'name' property
 * @return a string of the complete HTML code to insert
 */
function processQuery(query){
  var history;
  var text = '<html>' +  
    '<head>' +
    '<title>Welcome</title>' +
    '</head>' +
    '<body>';
  
  if (query !== null && query.hasOwnProperty('name')){
    if(query.name === ""){
      text += "&#9835 Hello, (...), Won't You Tell Me Your Name? &#9835";
      history = appendAndRead("UknownUser");
    }
    else{
      //Protection against accents & XSS:
      var escapedName = escapeAll(query.name);
      console.log("escaped name = "+escapedName);
      text += "Hello "+escapedName+"!";
      history = appendAndRead(escapedName);
    }
  }
  else{
    text += "Welcome, please give me your name.";
    history = appendAndRead("UknownUser");
  }
  
  
  text += '<br><br>History:<br>'+
    history +
    '</body>' +
    '</html>';
    
  
  return text;
  
}

https.createServer(options, function(request, response) {
    
  ///The query containing the arguments in the query string 
  //I didn't have to use the 'unescape' or 'decodeURI' method.
  var query = url.parse(request.url, true).query;
  console.log("query = "+JSON.stringify(query));
  
  var htmlToInsert = processQuery(query);
  
  
  
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(htmlToInsert);
  
  
  response.end();
  
  
    
  
}).listen(8000);

console.log("Server is listening at https://localhost:8000");
