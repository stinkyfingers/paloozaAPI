var mongoose = require('mongoose'),
	bson = require('bson'),
	BSON = bson.BSONPure.BSON,
	ObjectID = require('bson-objectid'),
	utility = require('../controllers/utility');

var mongo = require('mongodb');

//connect
mongoose.connect(utility.config.database);


var challengeSchema = mongoose.Schema({
	// _id: BSON.ObjectID,
	name: String,
	days: [{
		name:String,
		date: Date,
		restaurant: {
			name:String,
			address: String,
		},
		people: [{
			firstName: String,
			lastName: String
		}]
	}]

},{collection:'challenges'});

challengeSchema.methods.findByName = function(c){
	return this.model('Challenge').find({name: this.name});
};

challengeSchema.statics.findStatic = function(c){
	return this.model('Challenge').find({name: c});
};

challengeSchema.statics.findById = function(id){
	var bid = ObjectID(id).toHexString();
	return this.model('Challenge').find({'_id':bid});
};

var Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;