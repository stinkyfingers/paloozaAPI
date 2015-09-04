var jwt    = require('jsonwebtoken'),
	utility = require('../controllers/utility'),
	user = require('../models/user'),
	challenge = require('../models/challenge'),
	restify = require('restify');

//validate jwt
exports.jwt = function(req, res, next){
	var token = getToken(req.headers.authorization);
	jwt.verify(token, utility.config.secret, function(err, decoded){
		if (err) {
			return next(new restify.errors.InternalServerError('Bad token'));
		}else{
			req.decoded = decoded;
			next();
		}
	});
};

//use jwt to see if user has access to challenge (for write, update, delete)
exports.accessChallenge = function(req, res, next){
	var token = getToken(req.headers.authorization);
	if (token === null || token === undefined || token === ''){
		return next (new restify.errors.InternalServerError('No token'));
	}

	user.findOne({'token': token}).then(function(u){
		var c = new challenge(req.body);

		for (var i = 0; i < u.challenges.length; i++){
			if (c._id.toString() === u.challenges[i].toString()){
				next();
			}
		}
		return next(new restify.errors.InternalServerError('No access to that challenge.'));
	});
};

exports.admin = function(req, res, next){
	var token = getToken(req.headers.authorization);
	if (token === null || token === undefined || token === ''){
		return next (new restify.errors.InternalServerError('No token'));
	}

	user.findOne({'token': token}).then(function(u){
		if (u.admin){
			req.user = u;
			next();
		}
		return next(new restify.errors.InternalServerError('User is not admin.'));
	});
}

//string parsing token out
var getToken = function(authHeader){
	if (!authHeader){
		return;
	}
	var token = authHeader;
	return token.replace('Bearer: ','');
};