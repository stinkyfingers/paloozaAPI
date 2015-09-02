var user = require('../models/user'),
	utility = require('../controllers/utility'),
	jwt    = require('jsonwebtoken'),
	restify = require('restify'); // used to create, sign, and verify tokens


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
	user.findOne({'username':req.body.username, 'password':req.body.password}).then(function(user){
		if (!user){
			res.send(new restify.errors.UnauthorizedError);
			return;
		}
		var token = jwt.sign(user, utility.config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
		res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
	});
};

exports.getAll = function(req, res) {
	user.find({}, function(err, us){
		if (err) throw err;
	}).then(function(us){
		res.json(us);
	});
};