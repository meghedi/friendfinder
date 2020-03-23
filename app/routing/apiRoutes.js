let friendsData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
       let totalDifference = 0;
       let minDifference = 10;
       let bestMatchIdex = 0;
        for (let i = 0; i < friendsData.length; i++) {
            const element = friendsData[i];
            for (let j = 0; j < element.answers.length; j++) {
                const element2 = parseInt(element.answers[j]);
                debugger;
                if (req.body.answers[j] !== element2) {
                    let differnce = Math.abs(req.body.answers[j] - element2);
                    totalDifference +=differnce;
                }
            }

            console.log(totalDifference);

            if (totalDifference < minDifference){
                bestMatchIdex  = i;
                minDifference = totalDifference;
            }
        }

        friendsData.push(req.body);
        res.json(friendsData[bestMatchIdex]);
    });
}