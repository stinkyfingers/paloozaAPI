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
