var challenge = require('../models/challenge');
var mongoose = require('mongoose');


exports.create = function(req, res) {
	var c = new challenge(req.body);
	c.save(function(err){
		if (err) throw err;
	});
	res.json(c);
};

exports.get = function(req, res) {
	var id = req.params.id;
	challenge.findById(id).then(function(c){
		if (c.length > 0){
			res.json(c[0]);
			return;
		}
		res.send('no results');
	});
};

exports.findAll = function(req, res) {
	challenge.find({}, function(err, cs) {
		if (err) throw err;
	}).then(function(cs){
		res.json(cs);
	});
};

exports.find = function(req, res) {
	var c = new challenge(req.body);
	c.findByName().then(function(result){
		res.json(result);
	});
};

exports.findStatic = function(req, res) {
	challenge.findStatic(req.body.name).then(function(result){
		res.json(result);
	});
};

exports.update = function(req, res){
	var c = new challenge(req.body);
	// c._id = mongoose.Types.ObjectId(req.body._id);
	// c.name = req.body.name;
	c.isNew = false; //update rather than insert TODO try init()
	c.save(function(err){
		if (err) throw err;
	});
	res.json(c);
};

exports.remove = function(req, res){
	var c = new challenge(req.body);
	c.remove(function(err){
		if (err) throw err;
	});
	res.json(c);
};

// challengeSchema.create = function(req, res) {
// 	var c = new Challenge();
// 	// c = req.body;
// 	// console.log(c)
// 	c.save(function(err) {

// 		if (err)
// 	res.send('callend');

// 			console.log(err);
// 			res.send(err);
// 		// res.json({message: 'Challenge created'});
// 		res.send('done');
// 	});
// };

// challengeSchema.methods.create = function(req, res){
// 	// var c = new Challenge();
// 	res.send('calee');
// }



// challengeSchema.findAll = function(req, res){
// 	var c = new Challenge();

// 	c.find({ size: 'small' });
// 	res.send('called');
// 	// var c = new Challenge();
// 	// c.find({}).exec(function(err, i){
// 	// 	console.log(err)
// 	// }):
// }

// exports.find = function(req, res){
// 	db.collection('challenges', function(err, col) {
// 			console.log(err)

// 		col.find().toArray(function(err, i) {
// 			console.log(err)
// 			res.send(i);
// 		});
// 	});
// }


//OLD


// var Server = mongo.Server,
// 	Db = mongo.Db,
// 	bson = require('bson'),
// 	BSON = bson.BSONPure.BSON;

// var server = new Server('localhost', 27017, {auto_reconnect: true});
// db = new Db('paloozaapi', server)

// db.open(function(err, db){
// 	if(!err) {
// 		console.log('Connected to palooza');
// 		// db.collection('challenges', {strict: true}, function(err, collection){
// 		// 	if (err) {
// 		// 		console.log('The wines collection doesn\'t exist. Creating');
// 		// 		populateDB();
// 		// 	}
// 		// })
// 	}
// });



// exports.find = function(req, res){
// 	db.collection('challenges', function(err, collection) {
// 		collection.find().toArray(function(err, i){
// 			console.log(i);
// 			res.send(i);
// 		});
// 	});
// };

// exports.create = function(req, res){
// 	var challenge = req.body;
// 	console.log('Adding challenge: ' + JSON.stringify(challenge));
// 	db.collection('challenges',function(err, collection){
// 		collection.insert(challenge, {safe:true}, function(err, result){
// 			if (err) {
// 				res.send({'error':'Error saving challenge'});
// 			}else{
// 				res.send(result[0]);
// 			}
// 		});
// 	});
// };

// exports.update = function(req, res){
// 	var challenge = req.body;
// 	console.log(new BSON.ObjectID(challenge._id));
// 	console.log(typeof(challenge._id));
// 	challenge._id = null;
// 	console.log('Updating challenge: ' + JSON.stringify(challenge));
// 	db.collection('challenges',function(err, collection){
// 		collection.update({'_id':new BSON.ObjectID(challenge._id)}, challenge, {safe:true}, function(err, result){
// 			if (err) {
// 				res.send({'error':'Error updating challenge'+err});
// 			}else{
// 				res.send(result[0]);
// 			}
// 		});
// 	});
// };

// exports.remove = function(req, res){
// 	var challenge = req.body;
// 	console.log('Removing challenge: ' + JSON.stringify(challenge));
// 	db.collection('challenges',function(err, collection){
// 		collection.remove({'_id':new BSON.ObjectID(challenge._id)}, {safe:true}, function(err, result){
// 			if (err) {
// 				res.send({'error':'Error removing challenge'});
// 			}else{
// 				res.send(result[0]);
// 			}
// 		});
// 	});
// };
