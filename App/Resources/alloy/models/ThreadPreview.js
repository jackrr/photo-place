var ServerUtil = require("serverUtil");

var serverURL = "http://localhost:3000/";

exports.definition = {
    config: {
        URL: serverURL + "threads",
        adapter: {
            type: "restapi",
            collection_name: "ThreadPreviews",
            idAttribute: "_id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            forPhoto: function(photoID, options) {
                options.url = serverURL + "photo/" + photoID + "/threads";
                this.fetch(options);
            }
        });
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("threadPreview", exports.definition, []);

collection = Alloy.C("threadPreview", exports.definition, model);

exports.Model = model;

exports.Collection = collection;