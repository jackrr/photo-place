function Controller() {
    function closeWindow() {
        $.destroy();
        $.auth.close();
    }
    function openCreateAccount() {
        Alloy.createController("createAccount");
        closeWindow();
    }
    function openLogIn() {
        Alloy.createController("logIn");
        closeWindow();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "auth";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.auth = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        backgroundImage: "/images/welcome-to-background.png",
        id: "auth"
    });
    $.__views.auth && $.addTopLevelView($.__views.auth);
    $.__views.title = Ti.UI.createLabel({
        top: 30,
        width: Ti.UI.SIZE,
        id: "title",
        text: "Welcome to\nPhoto Place"
    });
    $.__views.auth.add($.__views.title);
    $.__views.createAccount = Ti.UI.createLabel({
        top: 100,
        width: Ti.UI.SIZE,
        text: "Create Account",
        id: "createAccount"
    });
    $.__views.auth.add($.__views.createAccount);
    openCreateAccount ? $.__views.createAccount.addEventListener("click", openCreateAccount) : __defers["$.__views.createAccount!click!openCreateAccount"] = true;
    $.__views.logIn = Ti.UI.createLabel({
        top: 10,
        width: Ti.UI.SIZE,
        text: "Log In",
        id: "logIn"
    });
    $.__views.auth.add($.__views.logIn);
    openLogIn ? $.__views.logIn.addEventListener("click", openLogIn) : __defers["$.__views.logIn!click!openLogIn"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.auth.open();
    __defers["$.__views.createAccount!click!openCreateAccount"] && $.__views.createAccount.addEventListener("click", openCreateAccount);
    __defers["$.__views.logIn!click!openLogIn"] && $.__views.logIn.addEventListener("click", openLogIn);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;