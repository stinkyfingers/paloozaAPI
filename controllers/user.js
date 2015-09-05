var user = require('../models/user'),
	challenge = require('../models/challenge'),
	utility = require('../controllers/utility'),
	jwt    = require('jsonwebtoken'),
	md5 = require('md5'),
	restify = require('restify'); // used to create, sign, and verify tokens


exports.create = function(req, res) {
	var u = new user(req.body);
	u.password = md5(u.password);
	u.save(function(err){
		if (err) throw err;
	});
	res.json(u);
};

exports.update = function(req, res) {
	var u = new user(req.body);
	u.password = md5(u.password);
	u.isNew = false;
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
	var u = new user(req.body);
	u.password = md5(u.password);
	user.findOne({'username':u.username, 'password':u.password}).then(function(user){
		if (!user){
			res.send(new restify.errors.UnauthorizedError);
			return;
		}
		var token = jwt.sign(user, utility.config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        user.token = token;
        user.isNew = false;
        user.save(function(err){
        	if (err) return err;
        });
		res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user: user
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

// exports.getUserChallenges = function(req, res){
// 	var u = user(req.body);
// 	challenge.find({'_id':{'$in':[u.challenges]}}).then(function(cs){
		
// 	})
// }