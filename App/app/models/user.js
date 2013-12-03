exports.definition = {
    config : {
    	"URL": "http://localhost:3000/users",
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