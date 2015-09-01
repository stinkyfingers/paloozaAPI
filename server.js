
var restify = require('restify'),
	utility = require('./controllers/utility'),
	challenge = require('./controllers/challenge'),
	user = require('./controllers/user'),
	cors = require('cors');

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
app.post('/challenge/delete', challenge.remove);
app.get('/challenge/:id', challenge.get);
app.post('/challenge/find', challenge.find);
app.post('/challenge/static', challenge.findStatic);
app.post('/challenge', challenge.create);
app.put('/challenge', challenge.update);

//user
app.get('/user/:id', user.get);
app.post('/user/auth', user.authenticate);
app.post('/user', user.create);
app.get('/users', user.getAll);



var port = process.env.PORT;
if (port === '' || port === undefined || port === null){
	port = 8080;
}
app.listen(port, function(){
	console.log('running on port: '+ port);
});





