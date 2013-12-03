function Controller() {
    function updateUsers(newUsers) {
        newtext = "";
        _.each(newUsers.models, function(user) {
            newtext += user.get("name");
        });
        $.usersList.text = newtext;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "user";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.user = Ti.UI.createWindow({
        id: "user"
    });
    $.__views.user && $.addTopLevelView($.__views.user);
    $.__views.usersList = Ti.UI.createLabel({
        id: "usersList",
        top: "10"
    });
    $.__views.user.add($.__views.usersList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var users = Alloy.createCollection("user");
    $.user.open();
    users.fetch({
        success: function() {
            alert(JSON.stringify(users));
            updateUsers(users);
        },
        error: function(e) {
            alert(e);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;