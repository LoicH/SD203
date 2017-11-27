"use strict";

var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));


/**
 * Replace all chars with '&#xaa'. Useful for accents & XSS.
 */
function escapeAll(string) {
    var escapedChars = Array.prototype.map.call(string, function(char) {
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
function appendAndRead(username) {

    //We use Sync to avoid mixing writing & reading.
    var htmlHistory;
    try {
        htmlHistory = fs.readFileSync('log.html', 'utf8');
    } catch (err) {
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
function processQuery(query) {
    var history;
    var text = '<html>' +
        '<head>' +
        '<title>Welcome</title>' +
        '</head>' +
        '<body>';
    console.log("query = " + JSON.stringify(query));
    if (query !== null && query.hasOwnProperty('name')) {
        if (query.name === "") {
            text += "&#9835 Hello, (...), Won't You Tell Me Your Name? &#9835";
            history = appendAndRead("UknownUser");
        } else {
            //Protection against accents & XSS:
            var escapedName = escapeAll(query.name);
            console.log("escaped name = " + escapedName);
            text += "Hello " + escapedName + "!";
            history = appendAndRead(escapedName);
        }
    } else {
        text += "Welcome, please give me your name.";
        history = appendAndRead("UknownUser");
    }
    text += '<br><br>History:<br>' +
        history +
        '</body>' +
        '</html>';
    return text;

}


// Provide all routes here, this is for Home page.
app.post("/", function(req, res) {
    console.log("req.body = " + JSON.stringify(req.body));

    if (Object.keys(req.body).length !== 0) {
        res.send(processQuery(req.body));
    } else {
        res.send("Welcome to the home page");
    }

});


// Listen to this Port

app.listen(8000, function() {
    console.log("Server is listening at http://localhost:8000");
});
