var mongoose = require('mongoose'),
	bson = require('bson'),
	user = require('./user'),
	BSON = bson.BSONPure.BSON,
	ObjectID = require('bson-objectid'),
	utility = require('../controllers/utility');

var mongo = require('mongodb');

//connect
mongoose.connect(utility.config.database);


var challengeSchema = mongoose.Schema({
	name: String,
	days: [{
		name:String,
		date: Date,
		restaurant: {
			name:String,
			address: String,
		},
		people: []
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

challengeSchema.statics.updateUser = function(u){
	this.model('Challenge').find({}, function(err, challenges){
		if (err) throw err;
	
		for (var i = 0; i < challenges.length; i++){
			for (var j = 0 ; j < challenges[i].days.length; j++){
				for (var k = 0; k < challenges[i].days[j].people.length; k++){
					if ((typeof(challenges[i].days[j].people[k]._id) !== 'object') || (typeof(u._id) !== 'object')){ //Hmmm...
						continue;
					}
					if (challenges[i].days[j].people[k]._id.toHexString() === u._id.toHexString()){
						challenges[i].days[j].people[k] = u;
						challenges[i].flag = true;
					}
				}	
			}
		}

		for (var i = 0; i < challenges.length; i++){
			if (challenges[i].flag === true){
				challenges[i].flag = null;
				this.update({_id: challenges[i]._id},{days: challenges[i].days},function(err){
					if (err) throw err;
				});
			}
		} 
	});
};

challengeSchema.methods.convertPersonIDs = function(){
	for (var j = 0 ; j < this.days.length; j++){
		for (var k = 0; k < this.days[j].people.length; k++){
			if (typeof(this.days[j].people[k]._id) !== 'object'){
				this.days[j].people[k]._id = mongoose.Types.ObjectId(this.days[j].people[k]._id)
			}
		}
	}
	return;
};

var Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;