var _ = require('underscore');

function error(err, res) {
	console.log(err);
	res.json(500, {err: err});
}

function makePreviews(threads) {
	_.each(threads, function(thread) {
		thread.comments = undefined;
	});
	return threads;
}

module.exports = function(db) {
	var Thread = db.Thread;
	var Comment = db.Comment;

	function getThreadPreviews(req, res) {
		Thread.find({photoID: req.params.photoID}, function(err, threads) {
			if (err) return error(err, res);
			res.json({threadPreviews: makePreviews(threads)});
		});
	}

	function getThread(req, res) {
		Thread.find({_id: req.params.threadID}, function(err, thread) {
			if (err) return error(err, res);
			res.json({thread: thread});
		});
	}

	function newThread(req, res) {
		if (!req.body.userID || !req.body.photoID) {
			return error('bad parameters', res);
		}
		req.body.createdDate = Date.now();
		Thread.create(req.body, function(err, thread) {
			if (err) return error(err, res);
			res.json({thread: thread});
		});
	}

	function newComment(req, res) {
		if (!req.body.userID || !req.body.photoID) {
			return error('bad parameters', res);
		}
		req.body.createdDate = Date.now();
		var comment = Comment.new(req.body);
		Thread.findOneAndUpdate({_id: req.params.threadID}, { $push: { comments: comment} }, function(err, thread) {
			if (err) return error(err, res);
			res.json({thread: thread});
		});
	}


	return {
		getThreadPreviews: getThreadPreviews,
		getThread: getThread,
		newThread: newThread,
		newComment: newComment
	};
};