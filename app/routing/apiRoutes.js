var friends = require('../data/friends.js');

//routing
module.exports = function (app) {
    // Handles page visits
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    // Post to page
    app.post('/api/friends', function (req, res) {
        //storing bestMatch
        var bestMatch = {
            name: "",
            photo: "",
            scoreDiff: 0
        };

        //user info
        var userData = req.body;
        var userScores = userData.scores;
        var userName = userData.name;
        var userPhoto = userData.photo;

        var totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        for (var i = 0; i < friends.length - 1; i++) {
            
            totalDifference = 0;

            //loop through the scores
            for (var j = 0; j < 10; j++) {
                // Finding the difference between the scores 
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.scoreDiff) {

                    // Reset the bestMatch to be the new friend. 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.scoreDiff = totalDifference;
                }
            }
        }
        //push to database
        friends.push(userData);
        //return best match
        res.json(bestMatch);
    });
};
