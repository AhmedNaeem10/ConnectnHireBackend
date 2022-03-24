const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://ahmednaeem5575:9026040An!@cluster0.47nh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);


exports.getChats = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        let dbo = db.db("myFirstDatabase");
        
    });
}