"use strict";

var express = require("express");
var app = express();

var router = express.Router();


// Provide all routes here, this is for Home page.
router.get("/", function(req, res) {
    res.send("Welcome to the home page");
});

router.get("/hello/:language", function(req, res) {
    switch (req.params.language) {
        case "french":
            res.send("Bienvenue");
            break;
        case "german":
            res.send("Willkommen");
            break;
        case "swedish":
            res.send("Välkommen");
            break;
        default:
            res.send("Welcome");
    }
});

// express handles requests from this URL:
app.use("/", router);


// Listen to this Port

app.listen(8000, function() {
    console.log("Server is listening at http://localhost:8000");
});
