var mongoose = require('mongoose'),
	bson = require('bson'),
	user = require('./user'),
	BSON = bson.BSONPure.BSON,
	ObjectID = require('bson-objectid'),
	utility = require('../controllers/utility');

var mongo = require('mongodb');

//connect
// mongoose.connect(utility.config.database);

var potluckSchema = mongoose.Schema({
	name: String,
	data: Date,
	dishes: {
		user: Object,
		dish: String,
	}
}, {collection: 'potlucks'});

potluckSchema.methods.findByName = function(c){
	return this.model('Potluck').find({name: this.name});
};

potluckSchema.statics.findStatic = function(c){
	return this.model('Potluck').find({name: c});
};

potluckSchema.statics.findById = function(id){
	var bid = ObjectID(id).toHexString();
	return this.model('Potluck').find({'_id':bid});
};

potluckSchema.statics.updateUser = function(u){
	this.model('Potluck').find({}, function(err, potlucks){
		if (err) throw err;
	
		for (var i = 0; i < potlucks.length; i++){
			for (var j = 0 ; j < potlucks[i].dishes.length; j++){
				if ((typeof(potlucks[i].dishes[j].user._id) !== 'object') || (typeof(u._id) !== 'object')){ //Hmmm...
					continue;
				}
				if (potlucks[i].dishes[j].user._id.toHexString() === u._id.toHexString()){
					potlucks[i].dishes[j].user = u;
					potlucks[i].flag = true;
				}
			}
		}

		for (var i = 0; i < potlucks.length; i++){
			if (potlucks[i].flag === true){
				potlucks[i].flag = null;
				this.update({_id: potlucks[i]._id},{days: potlucks[i].days},function(err){
					if (err) throw err;
				});
			}
		} 
	});
};

potluckSchema.methods.convertPersonIDs = function(){
	for (var j = 0 ; j < this.dishes.length; j++){
		if (typeof(this.days[j].user._id) !== 'object'){
			this.days[j].user._id = mongoose.Types.ObjectId(this.days[j].user._id)
		}
	}
	return;
};

var Potluck = mongoose.model('Potluck', potluckSchema);

module.exports = Potluck;