const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://ahmednaeem5575:9026040An!@cluster0.47nh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);

exports.send = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;

        // sender
        // receiver
        // message
        // time
        var dbo = db.db("myFirstDatabase");
        let msg = req.body;
        var today = new Date();
        var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
        var time = today.getHours() + "/" + today.getMinutes() + "/" + today.getSeconds();
        var date_time = date + ":" + time
        msg["time"] = date_time;
        msg["read"] = false
        let response = await dbo.collection("messages").insertOne(msg);
        if(response.acknowledged){
            res.send("success")
        }else{
            res.send("failed")
        }
    });
}

exports.getChats = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;

        // sender
        // receiver
        // message
        // time
        let username = req.params.username;
        var dbo = db.db("myFirstDatabase");
        let messages = await dbo.collection("messages").find({$or: [{sender: username}, {receiver: username}]}).toArray()
        let labels = []
        let chats = []
        for(let msg of messages){
            let label = msg.sender == username ? msg.receiver : msg.sender
            if(!labels.includes(label)){
                let obj = {}
                labels.push(label)
                obj["label"] = label;
                obj["msg"] = "";
                obj["time"] = "";
                obj["read"] = "";
                chats.push(obj)
            }
        }
        // for labels only, send labels here, for some details, do the following code
        for(let chat of chats){
            for(let msg of messages){
                let label = username == msg.sender ? msg.receiver : msg.sender
                if(chat["label"] == label){
                    if(msg.time > chat["time"]){
                        chat["time"] = msg.time;
                        chat["msg"] = msg.msg;
                        chat["read"] = msg.read;
                    }
                }
            }
        }
        res.send(chats)
    });
}

exports.getMessages = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        let username = req.params.username;
        let other = req.params.other
        var dbo = db.db("myFirstDatabase");
        let messages = await dbo.collection("messages").find({$or: [{$and:[{sender: username}, {receiver:other}]}, {$and: [{sender: other}, {receiver: username}]}]}).toArray()
        res.send(messages)
    });
}

exports.markAsRead = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        let username = req.params.username;
        let other = req.params.other;
        var dbo = db.db("myFirstDatabase");
        let response = await dbo.collection("messages").updateMany({$or: [{$and:[{sender: username}, {receiver:other}]}, {$and: [{sender: other}, {receiver: username}]}]}, {$set:{read: true}});
        if(response.acknowledged){
            res.send("success")
        }else{
            res.send("failed")
        }
    });
}