var http = require('http');
var port = 3000;
var express = require("express");
var app = express();

app.set("view engine", "vash");

app.use(express.static(__dirname + "/public/"));

app.get("/", function (req, res) {
    res.render("index");
});


var server = http.createServer(app);

server.listen(port);
console.log("Game running at http://localhost:3000/");