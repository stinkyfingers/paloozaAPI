var mongoose = require('mongoose'),
	bson = require('bson'),
	BSON = bson.BSONPure.BSON,
	ObjectID = require('bson-objectid'),
	jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var utility = require('../controllers/utility');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    color: String,
    challenges: [], //ids - for admin challenges only
    token: String,
    admin: Boolean
},{collection:'users'});

// utility.connect();
// mongoose.connect(utility.config.database);

userSchema.statics.findById = function(id){
	var bid = ObjectID(id).toHexString();
	return this.model('User').find({'_id':bid});
};

var User = mongoose.model('User', userSchema);

module.exports = User;