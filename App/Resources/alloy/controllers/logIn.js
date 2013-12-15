function Controller() {
    function closeWindow() {
        $.destroy();
        $.logIn.close();
        Alloy.createController("index");
    }
    function submitInfo() {
        if ("" == $.username.value || "" == $.password.value) Ti.UI.createAlertDialog({
            message: "Please fill in both fields"
        }).show(); else {
            var url = "";
            url = "http://localhost:3000/users/auth";
            ServerUtil.checkPassword(url, {
                username: $.username.value,
                password: $.password.value
            }, function(err, user) {
                if (err) {
                    var errAlert = Ti.UI.createAlertDialog({
                        message: "Whoops! " + err
                    });
                    errAlert.show();
                    errAlert.addEventListener("click", function() {
                        $.password.value = "";
                    });
                } else {
                    user = JSON.parse(user);
                    Ti.App.Properties.setObject("authInfo", {
                        username: user.username,
                        email: user.email,
                        id: user._id
                    });
                    Ti.App.fireEvent("signIn", {
                        user: user
                    });
                    $.destroy();
                    $.logIn.close();
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "logIn";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.logIn = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.cream,
        fullscreen: true,
        layout: "vertical",
        backgroundImage: "/images/welcome-back-background.png",
        id: "logIn"
    });
    $.__views.logIn && $.addTopLevelView($.__views.logIn);
    $.__views.username = Ti.UI.createTextField({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 150,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Username",
        top: 210,
        id: "username"
    });
    $.__views.logIn.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 150,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Password",
        passwordMask: true,
        id: "password"
    });
    $.__views.logIn.add($.__views.password);
    $.__views.submit = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        width: Ti.UI.SIZE,
        top: 15,
        text: "Submit",
        id: "submit"
    });
    $.__views.logIn.add($.__views.submit);
    submitInfo ? $.__views.submit.addEventListener("click", submitInfo) : __defers["$.__views.submit!click!submitInfo"] = true;
    $.__views.cancel = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        width: Ti.UI.SIZE,
        top: 10,
        text: "Cancel",
        id: "cancel"
    });
    $.__views.logIn.add($.__views.cancel);
    closeWindow ? $.__views.cancel.addEventListener("click", closeWindow) : __defers["$.__views.cancel!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ServerUtil = require("serverUtil");
    Alloy.createCollection("user");
    $.logIn.open();
    $.logIn.addEventListener("android:back", function() {
        closeWindow();
    });
    __defers["$.__views.submit!click!submitInfo"] && $.__views.submit.addEventListener("click", submitInfo);
    __defers["$.__views.cancel!click!closeWindow"] && $.__views.cancel.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;