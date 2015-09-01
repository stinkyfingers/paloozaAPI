var user = require('../models/user');

exports.create = function(req, res) {
	var u = new user(req.body);
	u.save(function(err){
		if (err) throw err;
	});
	res.json(u);
};

exports.get = function(req, res) {
	var id = req.params.id;
	user.findById(id).then(function(u){
		if (u.length > 0){
			res.json(u[0]);
			return;
		}
		res.send('no results');
	});
};

exports.authenticate = function(req, res) {
	console.log(req.body.username);
	user.findOne({'username':req.body.username}).then(function(user){
		console.log(user);

		res.send('done');
	});
};

exports.getAll = function(req, res) {
	user.find({}, function(err, us){
		if (err) throw err;
	}).then(function(us){
		res.json(us);
	});
};