exports.definition = {
    config : {
    	"URL": "http://localhost:3000/users", // iOS devel
    	// "URL": "http://10.0.2.2:3000/users", // Android devel
        // table schema and adapter information
        "adapter": {
            "type": "restapi",
            "collection_name": "Users",
            "idAttribute": "_id"
        }
    },

    extendModel: function(Model) {		
        _.extend(Model.prototype, {
            // Extend, override or implement Backbone.Model 
        });
		
        return Model;
    },

    extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
            // Extend, override or implement Backbone.Collection 
        });
		
        return Collection;
    }
};