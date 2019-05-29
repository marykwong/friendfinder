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
            friendDifference: 1000
        };

        //user info
        var userData = req.body;
        var userScores = userData.scores;
        var userName = userData.name;
        var userPhoto = userData.photo;

        // The variable used to calculate the difference b/n the user's socres and the scores of each user
        var totalDifference = 0;

        //loop through the friends data array of objects to get each friends scores
        for (var i = 0; i < friends.length - 1; i++) {
            
            totalDifference = 0;

            //loop through that friends score and the users score and calculate the absolute difference between the two and push that to the total difference variable set above
            for (var j = 0; j < 10; j++) {
                // We calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset the bestMatch to be the new friend. 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // The push method use to save user's data to the database
        friends.push(userData);

        //The res.json method will return a JSON data with the user's match which was looped through frieds data array. 
        res.json(bestMatch);
    });
};
