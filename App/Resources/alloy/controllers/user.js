function Controller() {
    function updateUsers(newUsers) {
        Ti.API.info(JSON.stringify(newUsers));
        userList = newUsers.toJSON();
        var data = [];
        _.each(userList, function(user) {
            Ti.API.info(user["username"]);
            data.push(Ti.UI.createTableViewRow({
                title: user["username"]
            }));
        });
        Ti.API.info(data);
        var usersTable = Ti.UI.createTableView({
            data: data,
            top: 10
        });
        $.user.add(usersTable);
    }
    function closeWindow() {
        $.user.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "user";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.user = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "user"
    });
    $.__views.user && $.addTopLevelView($.__views.user);
    $.__views.title = Ti.UI.createLabel({
        top: 10,
        width: Ti.UI.SIZE,
        text: "List of Users",
        id: "title"
    });
    $.__views.user.add($.__views.title);
    $.__views.closeButton = Ti.UI.createLabel({
        top: 10,
        width: Ti.UI.SIZE,
        text: "Close Window",
        id: "closeButton"
    });
    $.__views.user.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var users = Alloy.createCollection("user");
    $.user.open();
    users.fetch({
        success: function() {
            updateUsers(users);
        },
        error: function(e) {
            alert(e);
        }
    });
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;