
/*
 * GET home page.
 */

module.exports = function(db) {

	var index = function(req, res){
	  res.json({ title: 'Express' });
	};

	var user = require('./user')(db);
	var photos = require('./photos')(db);

	return {
		index: index,
		user: user,
		photos: photos
	};
};