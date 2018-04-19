var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
var port = process.env.port || 8080;

// parse application/x-www-form-urlencoded/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(port, function () {
    console.log("Server listening on port " + port);
});