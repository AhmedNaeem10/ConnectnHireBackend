const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://ahmednaeem5575:9026040An!@cluster0.47nh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);


exports.login = async (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        var obj = req.body;
        console.log(obj)
        let user = await dbo.collection("users").findOne({username:obj.username, password:obj.password});
        if(user){
            res.send("success")
        }else{
            res.send("failed")
        }
    });
}

