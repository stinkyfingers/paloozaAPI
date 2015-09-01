
var restify = require('restify'),
	main = require('./main');
	challenge = require('./controllers/challenge'),
  cors = require('cors');

var app = restify.createServer();

app.use(restify.fullResponse());
app.use(cors());
app.use(restify.bodyParser());

app.get(/\/docs\/public\/?.*/, restify.serveStatic({
  directory: './'
}));


app.get('/', main.test);
app.get('/challenges', challenge.findAll);
app.post('/challenge/delete', challenge.remove);
app.get('/challenge/:id', challenge.get);
app.post('/challenge/find', challenge.find);
app.post('/challenge/static', challenge.findStatic);
app.post('/challenge', challenge.create);
app.put('/challenge', challenge.update);


var port = process.env.PORT;
if (port === '' || port === undefined || port === null){
	port = 8080;
}
app.listen(port, function(){
	console.log('running on port: '+ port);
});





