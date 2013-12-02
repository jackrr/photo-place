function Controller() {
    function updateUsers(newUsers) {
        data = [];
        _.each(newUsers.models, function(user) {
            data.push({
                title: user.get("name")
            });
        });
        $.usersTable.setData(data);
    }
    function closeWindow() {
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "user";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.title = Ti.UI.createLabel({
        top: 10,
        width: Ti.UI.SIZE,
        text: "List of Users",
        id: "title"
    });
    $.__views.win.add($.__views.title);
    $.__views.usersTable = Ti.UI.createTableView({
        top: 10,
        width: Ti.UI.SIZE,
        height: 250,
        scrollable: true,
        id: "usersTable"
    });
    $.__views.win.add($.__views.usersTable);
    $.__views.closeButton = Ti.UI.createLabel({
        top: 10,
        width: Ti.UI.SIZE,
        text: "Close Window",
        id: "closeButton"
    });
    $.__views.win.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var users = Alloy.createCollection("Users");
    Ti.API.info("opening users page");
    users.fetch({
        success: function() {
            updateUsers(users);
        },
        error: function() {
            Ti.API.info("oops!");
        }
    });
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;