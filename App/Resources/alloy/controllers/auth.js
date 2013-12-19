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
        fullscreen: true,
        layout: "vertical",
        backgroundImage: "/images/welcome-to-background.png",
        id: "auth"
    });
    $.__views.auth && $.addTopLevelView($.__views.auth);
    $.__views.createAccount = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 275,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 20
        },
        text: L("createAccount"),
        id: "createAccount"
    });
    $.__views.auth.add($.__views.createAccount);
    openCreateAccount ? $.__views.createAccount.addEventListener("click", openCreateAccount) : __defers["$.__views.createAccount!click!openCreateAccount"] = true;
    $.__views.logIn = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 20
        },
        text: L("login"),
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