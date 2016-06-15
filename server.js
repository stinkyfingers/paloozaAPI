
var restify = require('restify'),
	utility = require('./controllers/utility'),
	challenge = require('./controllers/challenge'),
	potluck = require('./controllers/potluck'),
	user = require('./controllers/user'),
	cors = require('cors'),
	auth = require('./middleware/auth');

restify.CORS.ALLOW_HEADERS.push('authorization'); //preflight

var app = restify.createServer();

app.use(restify.fullResponse());
app.use(cors());
app.use(restify.bodyParser());



app.get(/\/docs\/public\/?.*/, restify.serveStatic({
  directory: './'
}));


//Status
app.get('/', utility.status);

//Challenge
app.get('/challenges', challenge.findAll);
app.post('/challenge/delete',auth.accessChallenge, challenge.remove);
app.get('/challenge/:id', challenge.get);
app.post('/challenge/find', challenge.find);
app.post('/challenge/static', challenge.findStatic);
app.post('/challenge', auth.admin, challenge.create);
app.put('/challenge', challenge.update);

//Potlucks
app.get('/potlucks', potluck.findAll);
app.post('/potluck/delete',auth.accessChallenge, potluck.remove);
app.get('/potluck/:id', potluck.get);
app.post('/potluck/find', potluck.find);
app.post('/potluck/static', potluck.findStatic);
app.post('/potluck', auth.admin, potluck.create);
app.put('/potluck', potluck.update);

//user
app.get('/user/:id', user.get);
app.post('/userauth', user.authenticate);
app.post('/user', user.create);
app.put('/user', user.update);
app.get('/users', auth.jwt, user.getAll);

var port = process.env.PORT;
if (port === '' || port === undefined || port === null){
	port = 8080;
}
app.listen(port, function(){
	console.log('running on port: '+ port);
});

//comment



