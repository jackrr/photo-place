var ServerUtil = require("serverUtil");

var serverURL = "http://localhost:3000/";

exports.definition = {
    config: {
        URL: serverURL + "threads",
        adapter: {
            type: "restapi",
            collection_name: "Threads",
            idAttribute: "_id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            setThread: function(threadID, options) {
                options.url = serverURL + "thread/" + threadID;
                this.fetch(options);
            },
            addComment: function(threadID, comment, options) {
                options.data = {
                    comment: comment
                };
                this.save(options);
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

model = Alloy.M("thread", exports.definition, []);

collection = Alloy.C("thread", exports.definition, model);

exports.Model = model;

exports.Collection = collection;