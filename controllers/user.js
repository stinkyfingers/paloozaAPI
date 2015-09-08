var user = require('../models/user'),
	challenge = require('../models/challenge'),
	utility = require('../controllers/utility'),
	jwt    = require('jsonwebtoken'),
	md5 = require('md5'),
	restify = require('restify'); // used to create, sign, and verify tokens


exports.create = function(req, res) {
	var u = new user(req.body);
	u.password = md5(u.password);
	user.create(u, function(err){
		if (err) throw err;
	});
	u.password = null;
	res.json(u);
};

exports.update = function(req, res) {
	var u = new user(req.body);
	var query  = {
		username: u.username,
		firstName: u.firstName,
		lastName: u.lastName,
		color: u.color,
	};
	if (u.password !== null && u.password !== ''){
		query.password = md5(u.password);
	}
	u.isNew = false;
	user.update({id:u._id}, query, function(err){
		if (err) throw err;
	});
	u.password = null;
	res.json(u);
};

exports.get = function(req, res) {
	var id = req.params.id;
	user.findById(id).then(function(u){
		if (u.length > 0){
			u[0].password = null;
			res.json(u[0]);
			return;
		}
		res.send('no results');
	});
};

exports.authenticate = function(req, res) {
	var u = new user(req.body);
	u.password = md5(u.password);
	user.findOne({username:u.username, password:u.password}, function(err, user){
		if (!user || err){
			res.send(new restify.errors.UnauthorizedError);
			return;
		}
		user.token = null;
		var token = jwt.sign(user, utility.config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        user.token = token;
        user.isNew = false;
        user.save(function(err){
        	if (err) return err;
        });
        user.password = null;

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
		for (u of us){
			u.password = null
		}
		res.json(us);
	});
};

// exports.getUserChallenges = function(req, res){
// 	var u = user(req.body);
// 	challenge.find({'_id':{'$in':[u.challenges]}}).then(function(cs){
		
// 	})
// }