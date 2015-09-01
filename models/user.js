var mongoose = require('mongoose'),
	bson = require('bson'),
	BSON = bson.BSONPure.BSON,
	ObjectID = require('bson-objectid');
var utility = require('../controllers/utility');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean
});

// utility.connect();
// mongoose.connect(utility.config.database);

userSchema.statics.findById = function(id){
	var bid = ObjectID(id).toHexString();
	return this.model('User').find({'_id':bid});
};

var User = mongoose.model('User', userSchema);

module.exports = User;