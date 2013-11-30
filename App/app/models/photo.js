exports.definition = {
	config : {
		"URL": "http://localhost:3000/photos",
		// table schema and adapter information
		"adapter": {
			"type": "restapi",
			"collection_name": "Photos",
			"idAttribute": "_id"
        }
    },

    extendModel: function(Model) {		
        _.extend(Model.prototype, {
            // Extend, override or implement Backbone.Model 
            url: function() {
            	return "http://localhost:3000/photo/" + this.get('_id');
            }
        });
		
        return Model;
    },

    extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
            // Extend, override or implement Backbone.Collection
			// page: 1,
			// grabPage: function() {
            	// page++;
            	// this.fetch(page);
            // }
        });
		
        return Collection;
    }
};