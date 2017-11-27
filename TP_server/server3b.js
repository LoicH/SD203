"use strict";

var mysql = require('mysql');
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

/* ******* Connecting to the database: ******* */
var connection = mysql.createConnection('mysql://TP5:TP5@murillo.enst.fr/TP5');

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


/* ******* SQL manipulation: ******* */

//Consult an article
function seeNews(title){
	var req = 'SELECT * FROM `news` WHERE `title` = "'+title+'"';
	var results;
	connection.query(req, function(err, res){
		results = res;
	});
	
	var html = "";
	results.forEach(function(article){
		html += "\n<h1>" + article.title + "</h1" +
			"<h2>" + article.author + ", on "+ article.date + "</h2>" +
			"<p> ("+ article.language + ")</p>" + 
			"<p>" + article.content + "</p>";
	});
	return html;
}

//Add an article
function addNews(article){
	var req = 'INSERT into `news` SET ?';
	connection.query(req, article, function (err) {
		if (err) throw err;
	});
	
	return "<p> Article added! </p>";

}

//Edit an article
function editNews(oldArticle, newArticle){
	var req = 'UPDATE table SET ? WHERE ?';
	connection.query(req, newArticle, oldArticle, function(err){
		if (err) throw err;
	});
	
	return "<p> Article changed! </p>";
}


//Remove an article
function removeNews(title){
	var req = 'DELETE from `news` WHERE title= "?"';
	connection.query(req, title, function (err) {
		if (err) throw err;
	});
	
	return "<p> Article removed! </p>";
}

/* ******* API definition: ******* */

function isLogged(cookies){
	var JSONcookies = cookieParser.JSONCookies(cookies);
	if (JSONcookies.hasOwnProperty('newsWebsite')){
		return JSONcookies.newsWebsite;
	} else {
		return "";
	}
}

//Consult an article
app.get('/consult/:title', function (req, res) {
	
   res.end(seeNews(req.params.title));
});

//Add an article
app.post('/add/', function (req, res) {
	//In req.body: date, author, content, language, title
	var username = isLogged(req.cookies) ;
   if (username !== ""){
		res.send("<p> Hi "+username + "</p>");
		res.end(addNews(req.body));
	}
	else {
		res.end("403: You need to login");
	}
});

//Edit an article
app.post('/edit/', function (req, res) {
	//In req.body: oldArticle, newArticle
   var username = isLogged(req.cookies) ;
   if (username !== ""){
		res.send("<p> Hi "+username + "</p>");
		res.end(editNews(req.body.oldArticle, req.body.newArticle));
	}
	else {
		res.end("403: You need to login");
	}
});

//Remove an article
app.get('/remove/:title', function (req, res) {
   var username = isLogged(req.cookies) ;
   if (username !== ""){
		res.send("<p> Hi "+username + "</p>");
		res.end(removeNews(req.params.title));
	}
	else {
		res.end("403: You need to login");
	}
});

//Simple login, in GET, without password...
app.get('/login/:username', function (req, res) {
   res.writeHead(200, {
    'Set-Cookie': 'newsWebsite='+req.params.username,
    'Content-Type': 'text/plain'
  });
  	res.end("<p> Hi "+req.params.username + "</p>");

});
