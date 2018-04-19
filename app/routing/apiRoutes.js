var path = require('path');
var friends = require('../data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (request, response) {
        response.json(friends);
    });

    // Female avatar: https://www.bandbtaos.com/images/avatar.png
    // Male avatar: http://saargn.com/wp-content/uploads/2017/08/mrlim.png

    app.post('/api/friends', function (request, response) {

        // Adding new user/friend object to friends array
        var newFriend = {};
        newFriend.id = parseInt(friends.length);
        newFriend.name = request.body.name;
        newFriend.photo = request.body.photo;
        newFriend.scores = request.body.scores;
        friends.push(newFriend);

        // Performing Compatibility Logic...
        // 1) Calulating and storing differences
        var differences = [];
        for (let i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            if (newFriend.id != friends[i].id) {
                for (let i2 = 0; i2 < newFriend.scores.length; i2++) {
                    totalDifference += Math.abs(parseInt(newFriend.scores[i2]) - friends[i].scores[i2]);
                };
                differences.push({ id: friends[i].id, difference: totalDifference });
            };
        };

        // 2) Determining and storing lowest difference
        var lowestDifference = differences[0].difference;
        for (let i = 1; i < differences.length; i++) {
            if (differences[i].difference < lowestDifference) {
                lowestDifference = differences[i].difference;
            };
        };

        // 3) Retrieving and storing all matches (duplicate lowest difference)
        var matches = [];
        for (let i = 0; i < differences.length; i++) {
            if (differences[i].difference === lowestDifference) {
                var matchID = differences[i].id;
                for (let i2 = 0; i2 < friends.length; i2++) {
                    if (friends[i2].id === matchID) {
                        matches.push(friends[i2]);
                    };
                };
            };
        };
        console.log("\nmatches = ", matches);

        response.json(matches);

    });

};