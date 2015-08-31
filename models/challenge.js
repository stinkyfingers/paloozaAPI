var mongoose = require('mongoose'),
	bson = require('bson'),
	BSON = bson.BSONPure.BSON,
	ObjectID = require('bson-objectid');
var mongo = require('mongodb');

//connect
var mongo_uri = process.env.MONGOLAB_URI;
var mgo;
if (mongo_uri  === undefined || mongo_uri  === ''){
	mgo = 'mongodb://localhost:27017/paloozaapi';
}else{
	mgo = 'mongodb://'+mongo_uri + '/paloozaapi';
}
mongoose.connect(mgo);

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

});

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