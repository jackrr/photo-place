var ServerUtil = require('serverUtil');
var serverURL = "http://localhost:3000/";
// var serverURL = Alloy.CFG.serverURL; WHY DOESN'T THIS WORK?? 

exports.definition = {
	config : {
		"URL": serverURL+"photos",
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
            		return serverURL + "photo/" + this.get('_id');	
            	} else {
            		return undefined;
            	}
            },

            setPhotoURL: function() {
            	return this.url() || "http://localhost:3000/photos";
            }, 
            
            setImage: function(image, place) {
            	ServerUtil.sendPhoto(this.setPhotoURL(), image, place);
            }
        });
		
        return Model;
    },

    extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
			page: 0,
			
			nextPage: function(options) {
            	this.page++;
            	options.url = serverURL + "photos/page/" + this.page;
            	this.fetch(options);
           },
           previousPage: function(options) {
           		if (this.page > 0) {
           	    	this.page--;
           	    }
           		options.url = serverURL + "photos/page/" + this.page;
           		this.fetch(options);
           },
           currentPage: function(options) {
           		options.url = serverURL + "photos/page/" + this.page;
           		this.fetch(options);
           }
        });
		
        return Collection;
    }
};