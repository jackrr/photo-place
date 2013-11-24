
/*
 * GET home page.
 */

module.exports = function(db) {

	var index = function(req, res){
	  res.json({ title: 'Express' });
	};

	var user = require('./user')(db);

	return {
		index: index,
		user: user
	};
};