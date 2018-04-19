var path = require('path');
var friends = require('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function(request, response) {
        response.json(friends);
    });
    
    app.post('/api/friends', function(request, response) {
        console.log("app.post processed");
    });
    
};