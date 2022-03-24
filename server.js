const express = require('express')
const login = require('./controllers/login')
const signup = require('./controllers/signup')
const job = require('./controllers/job')
const user = require('./controllers/user')
const message = require('./controllers/message')

var cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://connect-and-hire.herokuapp.com',
    credentials: true
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "https://connect-and-hire.herokuapp.com");
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT || 5000)

app.get('/', (req, res)=>{
    res.send("nonsense")
});

app.get('/user/:username', user.getUser)
app.get('/jobs/:username', job.getJobs)
app.get('/posted/:client', job.getPostedJobs);
app.get('/applied/:freelancer', job.getAppliedJobs)
app.get('/pending/:freelancer', job.getPendingJobs)
app.get('/current/:freelancer', job.getCurrentJobs)
app.get('/delivered/:freelancer', job.getDeliveredJobs)
app.get('/completed/:freelancer', job.getCompletedJobs)
app.get('/clientCurrent/:client', job.getCurrentJobsClient)
app.get('/clientDelivered/:client', job.getDeliveredJobsClient)
app.get('/clientCompleted/:client', job.getCompletedJobsClient)
app.get('/applications/:client', job.getApplications)
app.get('/getApplication/:id', job.getApplicationById)
app.get('/chats/:username', message.getChats)
app.get('/messages/:username/:other', message.getMessages)
app.get('/job/:id', job.getJob);

app.post('/login', login.login);
app.post('/signup', signup.signup);
app.post('/post', job.post);
app.post('/apply', job.apply)
app.post('/message', message.send)
app.post('/submission', job.submission)

app.put('/changeToCurrent/:id', job.changeToCurrent);
app.put('/changeToDelivered/:id', job.changeToDelivered);
app.put('/changeToCompleted/:id', job.changeToCompleted);
app.put('/markAsRead/:username/:other', message.markAsRead)
app.put('/changeMode/:username', user.changeMode)

app.delete('/deleteJob/:id', job.delete)