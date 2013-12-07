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
				return url + "/page/" + this.page;
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
           
           byPlaceID: function(id, options) {
           		this.page = 0;
           		this.placeID = id; 
           		this.userID = undefined;
           		options.url = this.nextURL();
           		this.fetch(options);
           },
           
           byUserID: function(id, options) {
           		this.page = 0;
           		this.userID = id;
           		this.placeID = undefined;
           		options.url = this.nextURL();
           		this.fetch(options); 
           }
        });
		
        return Collection;
    }
};