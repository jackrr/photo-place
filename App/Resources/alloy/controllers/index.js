function Controller() {
    function addUser() {
        Ti.API.info("addUser click registered");
        var authWin = Alloy.createController("auth").getView();
        authWin.open();
    }
    function openUserPage() {
        var usersWin = Alloy.createController("user").getView();
        usersWin.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        top: 30,
        id: "title"
    });
    $.__views.index.add($.__views.title);
    $.__views.userPage = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        top: 30,
        text: "Click to open users page",
        id: "userPage"
    });
    $.__views.index.add($.__views.userPage);
    openUserPage ? $.__views.userPage.addEventListener("click", openUserPage) : __defers["$.__views.userPage!click!openUserPage"] = true;
    $.__views.addUser = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        top: 30,
        text: "Add user",
        id: "addUser"
    });
    $.__views.index.add($.__views.addUser);
    addUser ? $.__views.addUser.addEventListener("click", addUser) : __defers["$.__views.addUser!click!addUser"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    Ti.App.Properties.setObject("authInfo", null);
    if (!Ti.App.Properties.getObject("authInfo", false)) {
        var authWin = Alloy.createController("auth").getView();
        authWin.addEventListener("close", function() {
            var user = Ti.App.Properties.getObject("authInfo");
            $.title.text = "Hello, " + user.username;
        });
        authWin.open();
    }
    __defers["$.__views.userPage!click!openUserPage"] && $.__views.userPage.addEventListener("click", openUserPage);
    __defers["$.__views.addUser!click!addUser"] && $.__views.addUser.addEventListener("click", addUser);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;