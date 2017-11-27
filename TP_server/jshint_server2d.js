"use strict";

var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));



/**
 * Returns the username in the query, or an empty string
 * @param req an object where the name is stored in the 'name' property
 * @return the username
 */
function getUserFromQuery(query) {
    var username;
    if (query !== null && query.hasOwnProperty('name')) {
        username = query.name; //No need to escape the input.
    } else {
        username = "";
    }
    return username;
}

/**
 * Returns the logging history 
 * and appends the new user.
 * @param username The name of the user
 * @return a list of the previous users
 */
function appendAndRead(username) {

    //We use Sync to avoid mixing writing & reading.
    var history;
    try {
        history = fs.readFileSync('log.html', 'utf8').split('\n');
    } catch (err) {
        history = [];
        console.log(err);
    }

    //Here we don't use Sync because we want to respond as quick as possible
    if (username !== "") {
        fs.appendFile('log.html', username + '\n');
    } else {
        fs.appendFile('log.html', "Unknown User" + '\n');
    }
    return history;
}


// Provide all routes here, this is for Home page.
app.post("/", function(req, res) {

    console.log("req.body = " + JSON.stringify(req.body));

    var user = getUserFromQuery(req.body);
    var history = appendAndRead(user);
    console.log('user = ' + user);
    console.log('history = ' + history);

    var CSS = 'ul {' +
        '    background: #3399ff;' +
        '    padding: 20px;' +
        '}' +
        '' +
        'ul li {' +
        '    font-family: arial, sans-serif;' +
        '    background: #cce5ff;' +
        '    margin: 5px;' +
        '}';

    var templateHTML = '<html>' +
        '<head>' +
        '<title>Welcome</title>' +
        '<style>' +
        CSS +
        '</style>' +
        '</head>' +
        '<body>' +
        '' + //Greeting the user:
        '<%if (user !== "") { %>' +
        '<h2> Welcome <%= user %> </h2>' +
        '<% } else { %>' +
        '<p>What\'s your name again?</p>' +
        '<% } %>' +
        '' + //Printing history:
        '<%if (history.length != 0) { %>' +
        '<h2> History </h2>' +
        '<ul>' +
        '<% for(var i = 0; i<history.length-1; i++) { %>' +
        '<li> <%= history[i] %> </li>' +
        '<% } %>' +
        '</ul>' +
        '<% } else { %>' +
        '<p>You are the first to come here!</p>' +
        '<% } %>';



    res.send(ejs.render(templateHTML, {
        history: history,
        user: user
    }));

});

app.get("/", function(req, res) {
    res.send("Welcome! \n You used a GET request, you can POST your name!");
});

// Listen to this Port

app.listen(8000, function() {
    console.log("Server is listening at http://localhost:8000");
});
