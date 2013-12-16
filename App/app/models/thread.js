var ServerUtil = require('serverUtil');
var serverURL = ServerUtil.serverURL;

exports.definition = {
	config : {
		"URL": serverURL+"threads",
		// table schema and adapter information
		"adapter": {
			"type": "restapi",
			"collection_name": "Threads",
			"idAttribute": "_id"
        }
    },

    extendModel: function(Model) {		
        _.extend(Model.prototype, {
            setThread: function(threadID, options) {
            	options.url = serverURL + "thread/" + threadID;
            	this.fetch(options);
            },
            
            addComment: function(threadID, comment, options) {
            	options.data = {comment: comment};
            	this.save(options);
            }
        });
		
        return Model;
    },

    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
        	
        });
		
        return Collection;
    }
};