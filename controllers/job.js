const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://ahmednaeem5575:9026040An!@cluster0.47nh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const email = require('./email')
const axios = require('axios')


exports.post = async (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");

        // client username
        // job title
        // job desc
        // delivery time
        // budget
        // skills required
        let job = req.body;

        // available jobs
        let response = await dbo.collection("jobs").insertOne(job);
        if(response.acknowledged){
            // job has been posted successfully
            let user = await dbo.collection("users").findOne({username: job.client})
            if(user){
                let notification = {
                    "label": "C&H",
                    "msg": "Your job has been posted successfully!"
                }
                user.notifications.push(notification)
                let response = await dbo.collection("users").updateOne({username:job.client}, {$set: user})
            }
            res.send("success")
        }else{
            res.send("failed")
        }
    });
}

exports.apply = async (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        
        // freelancer
        // client
        // description
        // delivery time
        // budget

        let job = req.body;
        job['status'] = 'pending'
        // application for the available jobs
        let response = await dbo.collection("applications").insertOne(job);
        if(response.acknowledged){
            // Application submitted successfully
            console.log("application submitted")
            let user = await dbo.collection("users").findOne({username: job.client})
            if(user){
                let notification = {
                    "label": job.freelancer,
                    "msg": "Submitted an application to your job!"
                }
                user.notifications.push(notification)
                let response = await dbo.collection("users").updateOne({username:job.client}, {$set: user})
                console.log("notification pushed")
                if(response.acknowledged){
                    let res_ = await axios.get(`https://young-cliffs-72209.herokuapp.com/user/${job.client}`);
                    user = res_.data
                    email.application_received(job.client, user.email, job.freelancer, job.title);
                }
            }
        }
        res.send("failed")
    });
}

exports.getApplicationById = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        let id = req.params.id;
        let application = await dbo.collection("applications").findOne({_id: ObjectId(id)});
        res.send(application)
    });
}
exports.getApplications = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        let client = req.params.client;
        let applications = await dbo.collection("applications").find({client: client}).toArray();
        res.send(applications)
    });
}

exports.getJob = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const id = req.params.id;
        var dbo = db.db("myFirstDatabase");
        let job = await dbo.collection('jobs').findOne({_id:ObjectId(id)})
        res.send(job);
    });
}

exports.getJobs = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const username = req.params.username;
        var dbo = db.db("myFirstDatabase");
        let jobs = await dbo.collection('jobs').find({client: {$nin: [username]}}).toArray();
        res.send(jobs);
    });
}

exports.getPostedJobs = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const client = req.params.client;
        var dbo = db.db("myFirstDatabase");
        let posted = await dbo.collection('jobs').find({client: client}).toArray();
        res.send(posted)
    });
}

exports.getAppliedJobs = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const freelancer = req.params.freelancer;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({freelancer: freelancer}).toArray();
        res.send(applied)
    });
}

exports.getPendingJobs = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const freelancer = req.params.freelancer;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({freelancer: freelancer, status: "pending"}).toArray();
        res.send(applied)
    });
}

exports.getCurrentJobs = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const freelancer = req.params.freelancer;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({freelancer: freelancer, status: "current"}).toArray();
        res.send(applied)
    });
}

exports.getDeliveredJobs = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const freelancer = req.params.freelancer;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({freelancer: freelancer, status: "delivered"}).toArray();
        res.send(applied)
    });
}

exports.getCompletedJobs = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const freelancer = req.params.freelancer;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({freelancer: freelancer, status: "completed"}).toArray();
        res.send(applied)
    });
}


exports.getCurrentJobsClient = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const client = req.params.client;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({client: client, status: "current"}).toArray();
        res.send(applied)
    });
}

exports.getDeliveredJobsClient = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const client = req.params.client;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({client: client, status: "delivered"}).toArray();
        res.send(applied)
    });
}

exports.getCompletedJobsClient = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const client = req.params.client;
        var dbo = db.db("myFirstDatabase");
        let applied = await dbo.collection('applications').find({client: client, status: "completed"}).toArray();
        res.send(applied)
    });
}



exports.changeToCurrent = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const id = req.params.id;
        var dbo = db.db("myFirstDatabase");
        let application = await dbo.collection("applications").findOne({_id: ObjectId(id)})
        if(application){
            application.status = 'current';
            let response = await dbo.collection("applications").updateOne({_id: ObjectId(id)}, {$set: application});
            let notification = {
                "label": application.client,
                "msg": "Your application has been accepted. Better to start working!"
            }
            let user = await dbo.collection("users").findOne({username: application.freelancer})
            user.notifications.push(notification)
            response = await dbo.collection("users").updateOne({username:application.freelancer}, {$set: user})
            response = axios.delete(`https://young-cliffs-72209.herokuapp.com/deleteJob/${application.job_id}`)
            let res_ = await axios.get(`https://young-cliffs-72209.herokuapp.com/user/${application.freelancer}`);
            user = res_.data
            email.application_accepted(user.username, user.email, application.client, application.title);
            res.send("success")
        }
    });
}

exports.changeToDelivered = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const id = req.params.id;
        var dbo = db.db("myFirstDatabase");
        let application = await dbo.collection("applications").findOne({id: ObjectId(id)})
        if(application){
            application.status = 'delivered';
            let response = await dbo.collection("applications").updateOne({id: ObjectId(id)}, {$set: application});
            let notification = {
                "label": application.freelancer,
                "msg": "Your order has been submitted. Check it out!"
            }
            let user = await dbo.collection("users").findOne({username: application.client})
            user.notifications.push(notification)
            response = await dbo.collection("users").updateOne({username:application.client}, {$set: user})
            let res_ = await axios.get(`hhttps://young-cliffs-72209.herokuapp.com/user/${application.client}`);
            user = res_.data;
            email.job_delivered(user.username, user.email, application.freelancer, application.title);
            res.send("success")
        }
    });
}

exports.changeToCompleted = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const id = req.params.id;
        var dbo = db.db("myFirstDatabase");
        let application = await dbo.collection("applications").findOne({_id: ObjectId(id)})
        if(application){
            application.status = 'completed';
            let response = await dbo.collection("applications").updateOne({_id: ObjectId(id)}, {$set: application});
            let notification = {
                "label": application.client,
                "msg": "Your order has been accepted. Good job!"
            }
            let user = await dbo.collection("users").findOne({username: application.freelancer})
            user.notifications.push(notification)
            response = await dbo.collection("users").updateOne({username:application.freelancer}, {$set: user})
            let res_ = await axios.get(`https://young-cliffs-72209.herokuapp.com/user/${application.freelancer}`);
            user = res_.data;
            email.application_accepted(user.username, user.email, application.client, application.title)
            res.send("success")
        }
    });
}

exports.delete = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        const id = req.params.id;
        var dbo = db.db("myFirstDatabase");
        let response = await dbo.collection("jobs").remove({_id: ObjectId(id)})
        if(response.acknowledged){
            res.send("success")
        }
    });
}

exports.submission = (req, res) => {
    client.connect(async function(err, db) {
        if (err) throw err;
        var dbo = db.db("myFirstDatabase");
        const obj = req.body;
        const id = obj.id;
        let app = await dbo.collection("applications").findOne({_id: ObjectId(id)});
        app["status"] = obj.status;
        app["delivery_description"] = obj.delivery_description;
        app["file"] = obj.file;
        response = await dbo.collection("applications").updateOne({_id: ObjectId(id)}, {$set: app});
        if(response.acknowledged){
            res.send("success")
        }else{
            res.send("failed")
        }
    });
}