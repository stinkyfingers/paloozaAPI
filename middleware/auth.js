var jwt    = require('jsonwebtoken'),
	utility = require('../controllers/utility');

exports.jwt = function(req, res, next){
	// JWT auth
	var token = req.headers['x-access-token'];
	if (!token){
		return res.status(403).send({
			success: false, 
			message: 'No token provided.' 
		});
	}

	jwt.verify(token, utility.config.secret, function(err, decoded){
		if (err) {
			return  res.json({ 
				success: false, 
				message: 'Bad token.' 
			});
		}else{
			req.decoded = decoded;
			next();
		}
	});
};
