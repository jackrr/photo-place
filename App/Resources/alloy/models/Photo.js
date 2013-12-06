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
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("photo", exports.definition, []);

collection = Alloy.C("photo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;