
var restify = require('restify'),
	main = require('./main');
	challenge = require('./controllers/challenge');
	// bodyParser = require('body-parser');


var app = restify.createServer();
app.use(restify.bodyParser());
app.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

app.get(/\/docs\/public\/?.*/, restify.serveStatic({
  directory: './'
}));

// var http = require('http'),
// 	dispatcher = require('httpdispatcher');

// const PORT = 3000;

// function handleRequest(req, resp){
// 	try{
// 		resp.end('works '+ req.url);
// 		dispatcher.dispatch(req, resp);
// 	}catch(err) {
// 		console.log(err);
// 	}
// }

// dispatcher.setStatic('resources'); //path for static files

// dispatcher.onGet('/challenge', function(req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Page One');
// });

//A sample POST request
// dispatcher.onPost("/post1", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Got Post Data');
// });

// var server = http.createServer(handleRequest);
// server.listen(PORT, function(){
// 	console.log('Listening on :'+ PORT);
// });


app.get('/', main.test);
app.get('/challenges', challenge.findAll);
app.get('/challenge/:id', challenge.get);
app.post('/challenge/find', challenge.find);
app.post('/challenge/static', challenge.findStatic);
app.post('/challenge', challenge.create);
app.put('/challenge', challenge.update);
app.del('/challenge', challenge.remove);


var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('running');
});