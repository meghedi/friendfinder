let friendsData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        let totalDifference = 0;
        let differenceArray = [];
        let bestMatchIdex = 0;
        for (let i = 0; i < friendsData.length; i++) {
            const eachFriend = friendsData[i];
            for (let j = 0; j < eachFriend.answers.length; j++) {
                const lastAnswer = parseInt(req.body.answers[j]);
                const eachFriendAnswer = parseInt(eachFriend.answers[j]);
                let differnce = Math.abs(lastAnswer - eachFriendAnswer);
                totalDifference += differnce;
                differenceArray.push(totalDifference);
            }
           console.log(differenceArray);    
            for (let index = 0; index < differenceArray.length; index++) {
                if (differenceArray[index] <= differenceArray[bestMatchIdex]) {
                    bestMatchIdex = index;
                }
            }
        }

        friendsData.push(req.body);
        res.json(friendsData[bestMatchIdex]);
    });
}