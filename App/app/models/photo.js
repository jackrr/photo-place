var ServerUtil = require('serverUtil');
var LocationUtil = require('locationUtil');
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
            
            setImage: function(image, place, caption) {
            	ServerUtil.sendPhoto(this.setPhotoURL(), image, place, caption);
            }
        });
		
        return Model;
    },

    extendCollection: function(Collection) {		
        _.extend(Collection.prototype, {
			page: 0,
			
			nextURL: function(pageinc) {
				var url = serverURL + "photos"; 
				if (pageinc && pageinc !== 0) {
					this.page = this.page + pageinc;
					if (this.page < 0) {
						this.page = 0;
					}
				}
				if (this.placeID) {
					url = url + "/place/" + this.placeID;
				}
				if (this.userID) {
					url = url + "/user/" + this.userID;
				}
				if (this.nearbyBool) {
					return url = url + "/nearby/";
				}
				return url + "/page/" + this.page;
			},
			
			resetValues: function() {
				this.placeID = undefined;
				this.userID = undefined;
				this.page = 0;
				this.nearbyBool = undefined;
			},

			nextPage: function(options) {
            	options.url = this.nextURL(1);
            	this.fetch(options);	
          	},
           previousPage: function(options) {
           		options.url = this.nextURL(-1);
           		this.fetch(options);
           },
           currentPage: function(options) {
           		options.url = this.nextURL();
           		this.fetch(options);
           },
           
           global: function(options) {
           		this.resetValues();
           		options.url = this.nextURL();
           		this.fetch(options);
           },
           
           nearby: function(options) {
				this.resetValues();
				this.nearbyBool = true;
           		options.url = this.nextURL() + LocationUtil.nearbyPlaceIdsForURL();
				this.fetch(options);
           },
           
           byPlaceID: function(id, options) {
           		this.resetValues();
           		this.placeID = id; 
           		options.url = this.nextURL();
           		this.fetch(options);
           },
           
           byUserID: function(id, options) {
           		this.resetValues();
           		this.userID = id;
           		options.url = this.nextURL();
           		this.fetch(options); 
           }
        });
		
        return Collection;
    }
};