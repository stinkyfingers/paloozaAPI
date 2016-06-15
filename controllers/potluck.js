var potluck = require('../models/potluck'),
	user = require('../models/user'),
	utility = require('../controllers/utility'),
	mongoose = require('mongoose');

exports.create = function(req, res) {
	var p = new potluck(req.body);
	p.save(function(err){
		if (err) throw err;
	});

	var u = new user(req.user);
	u.challenges.push(p._id);
	u.isNew = false;
	u.save(function(err){
		if (err) throw err;
	});

	res.json(p);
};

exports.get = function(req, res) {
	var id = req.params.id;
	potluck.findById(id).then(function(p){
		if (p.length > 0){
			res.json(p[0]);
			return;
		}
		res.send('no results');
	});
};

exports.findAll = function(req, res) {
	potluck.find({}, function(err, ps) {
		if (err) throw err;
	}).then(function(ps){
		res.json(ps);
	});
};

exports.find = function(req, res) {
	var c = new potluck(req.body);
	p.findByName().then(function(result){
		res.json(result);
	});
};

exports.findStatic = function(req, res) {
	potluck.findStatic(req.body.name).then(function(result){
		res.json(result);
	});
};

exports.update = function(req, res){
	var p = new potluck(req.body);
	p.isNew = false; //update rather than insert TODO try init()
	p.convertPersonIDs();
	p.save(function(err){
		if (err) throw err;
	});
	res.json(p);
};

exports.remove = function(req, res){
	var p = new potluck(req.body);
	p.remove(function(err){
		if (err) throw err;
	});
	res.json(p);
};


