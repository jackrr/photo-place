function Controller() {
    function closeWindow() {
        $.destroy();
        $.logIn.close();
        Alloy.createController("auth");
    }
    function submitInfo() {
        if ("" == $.username.value || "" == $.password) alert("Please fill in all fields"); else {
            var url = "http://localhost:3000/users/auth";
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
        backgroundColor: "white",
        layout: "vertical",
        id: "logIn"
    });
    $.__views.logIn && $.addTopLevelView($.__views.logIn);
    $.__views.title = Ti.UI.createLabel({
        top: 20,
        width: Ti.UI.SIZE,
        text: "Log In",
        id: "title"
    });
    $.__views.logIn.add($.__views.title);
    $.__views.username = Ti.UI.createTextField({
        top: 50,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 250,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Username",
        id: "username"
    });
    $.__views.logIn.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 250,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Password",
        passwordMask: true,
        id: "password"
    });
    $.__views.logIn.add($.__views.password);
    $.__views.submit = Ti.UI.createLabel({
        top: 20,
        width: Ti.UI.SIZE,
        text: "Submit",
        id: "submit"
    });
    $.__views.logIn.add($.__views.submit);
    submitInfo ? $.__views.submit.addEventListener("click", submitInfo) : __defers["$.__views.submit!click!submitInfo"] = true;
    $.__views.cancel = Ti.UI.createLabel({
        top: 20,
        width: Ti.UI.SIZE,
        id: "cancel"
    });
    $.__views.logIn.add($.__views.cancel);
    closeWindow ? $.__views.cancel.addEventListener("click", closeWindow) : __defers["$.__views.cancel!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ServerUtil = require("serverUtil");
    Alloy.createCollection("user");
    $.logIn.open();
    __defers["$.__views.submit!click!submitInfo"] && $.__views.submit.addEventListener("click", submitInfo);
    __defers["$.__views.cancel!click!closeWindow"] && $.__views.cancel.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;