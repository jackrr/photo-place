var ServerUtil = require("serverUtil");

var serverURL = "http://localhost:3000/";

exports.definition = {
    config: {
        URL: serverURL + "photos",
        adapter: {
            type: "restapi",
            collection_name: "Photos",
            idAttribute: "_id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            url: function() {
                return this.get("_id") ? serverURL + "photo/" + this.get("_id") : void 0;
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
                if (pageinc && 0 !== pageinc) {
                    this.page = this.page + pageinc;
                    0 > this.page && (this.page = 0);
                }
                this.placeID && (url = url + "/place/" + this.placeID);
                this.userID && (url = url + "/user/" + this.userID);
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
                this.userID = void 0;
                options.url = this.nextURL();
                this.fetch(options);
            },
            byUserID: function(id, options) {
                this.page = 0;
                this.userID = id;
                this.placeID = void 0;
                options.url = this.nextURL();
                this.fetch(options);
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("photo", exports.definition, []);

collection = Alloy.C("photo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;