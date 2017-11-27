"use strict";

var http = require("http");
var server = http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    var htmlToInsert = "<html>" +
        "<head>" +
        "<title>Server working</title>" +
        "</head>" +
        "<body>" +
        "Welcome!" +
        "</body>" +
        "</html>";
    response.write(htmlToInsert);
    response.end();
});

server.listen(8000);
console.log("Server is listening at http://localhost:8000");