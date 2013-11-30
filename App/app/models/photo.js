var ServerUtil = require('serverUtil'); 

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
            url: function () {
            	if (this.get('_id')) {
            		return "http://localhost:3000/photo/" + this.get('_id');	
            	} else {
            		return undefined;
            	}
            },

            setPhotoURL: function() {
            	return this.url() || "http://localhost:3000/photos";
            }, 
            
            setImage: function(image) {
            	ServerUtil.sendPhoto(this.setPhotoURL(), image);
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