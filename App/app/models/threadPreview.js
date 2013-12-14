var ServerUtil = require('serverUtil');
var serverURL = "http://localhost:3000/"; // iOS devel
// var serverURL = "http://10.0.2.2:3000/"; // Android devel
// var serverURL = Alloy.CFG.serverURL; WHY DOESN'T THIS WORK?? 

exports.definition = {
	config : {
		"URL": serverURL+"threads",
		// table schema and adapter information
		"adapter": {
			"type": "restapi",
			"collection_name": "ThreadPreviews",
			"idAttribute": "_id"
        }
    },

    extendModel: function(Model) {		
        _.extend(Model.prototype, {
            
        });
		
        return Model;
    },

    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
        	
			forPhoto: function(photoID, options) {
				options.url = serverURL + "photo/" + photoID + "/threads";
				this.fetch(options);		
			}
        });
		
        return Collection;
    }
};