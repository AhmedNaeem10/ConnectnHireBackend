const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://ahmednaeem5575:9026040An!@cluster0.47nh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);


// get a particular user, for dashboard
exports.getUser = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const username  = req.params.username;
        var dbo = db.db("myFirstDatabase");
        let user = await dbo.collection("users").findOne({username:username});
        res.set('Access-Control-Expose-Headers', 'X-Total-Count')
        res.set('X-Total-Count', 1)
        res.send(user)
    });
}

exports.changeMode = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const username  = req.params.username;
        var dbo = db.db("myFirstDatabase");
        let user = await dbo.collection("users").findOne({username:username});
        user["mode"] == "buying" ? user["mode"] = "selling" : user["mode"] = "buying";
        let response = await dbo.collection("users").updateOne({username:username}, {$set: user})
        if(response.acknowledged){
            res.send("success")
        }else{
            res.send("failed")
        }
    });
}



