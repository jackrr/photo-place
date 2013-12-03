var ServerUtil = require("serverUtil");

exports.definition = {
    config: {
        URL: "http://localhost:3000/photos",
        adapter: {
            type: "restapi",
            collection_name: "Photos",
            idAttribute: "_id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            url: function() {
                return this.get("_id") ? "http://localhost:3000/photo/" + this.get("_id") : void 0;
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
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("photo", exports.definition, []);

collection = Alloy.C("photo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;