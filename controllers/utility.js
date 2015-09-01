var mongoose = require('mongoose');


//status
exports.status = function(req, res){
	console.log('status up');
	res.send('PaloozaAPI');
};


//db
var mongo_uri = process.env.MONGOLAB_URI;
var mgo;
if (mongo_uri  === undefined || mongo_uri  === ''){
	mgo = 'mongodb://localhost:27017/paloozaapi';
}else{
	mgo = 'mongodb://'+mongo_uri + '/paloozaapi';
}

exports.connect = function(){
	mongoose.connect(mgo);
};


exports.config = {
	'database':mgo,
	'secret':'tacos'
};