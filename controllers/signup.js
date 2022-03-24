const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://ahmednaeem5575:9026040An!@cluster0.47nh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const email = require('./email');

exports.signup = async (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        let username_ = req.body.username;
        let email_ = req.body.email;

        console.log("Signup requested:", username_, email_)
        let user = await dbo.collection("users").findOne({username: username_ , email: email_});
        if(user == null){
            var obj = req.body;
            obj['mode'] = 'buying';
            obj['about'] = '';
            obj['skills'] = [];
            obj['response_rate'] = '100%';
            obj['response_time'] = 1;
            obj['delivered_on_time'] = '100%';
            obj['order_compleition'] = '100%';
            obj['rating'] = 'N/A';
            obj['balance'] = 0;
            obj['pending_clearance'] = 0;
            obj['avg_selling_price'] = 0;
            obj['jobs'] = [];
            obj['notifications'] = [{"label": "C&H", "msg": "Welcome to Connect & Hire!"}]
            obj['messages'] = []
            obj['online'] = true
            let response = await dbo.collection("users").insertOne(obj);
            if(response.acknowledged){
                email.signup(obj.first, obj.username, obj.email);
                res.send("success")
            }
        }else{
            res.send("failed")
        }
    });
}