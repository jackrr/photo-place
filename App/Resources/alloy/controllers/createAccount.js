function Controller() {
    function closeWindow() {
        $.createAccount.close();
    }
    function submitInfo() {
        if ("" == $.username.value || "" == $.password1.value || "" == $.password2.value) alert("All fields are required"); else if ($.password1.value != $.password2.value) alert("Passwords do not match"); else {
            var newUser = {
                username: $.username.value,
                password: $.password1.value,
                email: $.email.value
            };
            user.set({
                username: $.username.value,
                password: $.password1.value,
                email: $.email.value
            });
            Ti.API.info(JSON.stringify(user));
            Ti.App.Properties.setObject("authInfo", newUser);
            user.save();
            closeWindow();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "createAccount";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.createAccount = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "createAccount"
    });
    $.__views.createAccount && $.addTopLevelView($.__views.createAccount);
    $.__views.winlabel = Ti.UI.createLabel({
        top: 50,
        width: Ti.UI.SIZE,
        text: "Create New Account",
        id: "winlabel"
    });
    $.__views.createAccount.add($.__views.winlabel);
    $.__views.email = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 250,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Email",
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        id: "email"
    });
    $.__views.createAccount.add($.__views.email);
    $.__views.username = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 250,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Username",
        id: "username"
    });
    $.__views.createAccount.add($.__views.username);
    $.__views.password1 = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 250,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Password",
        passwordMask: true,
        id: "password1"
    });
    $.__views.createAccount.add($.__views.password1);
    $.__views.password2 = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: 250,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        hintText: "Re-enter Password",
        passwordMask: true,
        id: "password2"
    });
    $.__views.createAccount.add($.__views.password2);
    $.__views.submit = Ti.UI.createLabel({
        top: 10,
        width: Ti.UI.SIZE,
        text: "Submit",
        id: "submit"
    });
    $.__views.createAccount.add($.__views.submit);
    submitInfo ? $.__views.submit.addEventListener("click", submitInfo) : __defers["$.__views.submit!click!submitInfo"] = true;
    $.__views.cancel = Ti.UI.createLabel({
        top: 10,
        width: Ti.UI.SIZE,
        text: "Cancel",
        id: "cancel"
    });
    $.__views.createAccount.add($.__views.cancel);
    closeWindow ? $.__views.cancel.addEventListener("click", closeWindow) : __defers["$.__views.cancel!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user");
    $.createAccount.open();
    __defers["$.__views.submit!click!submitInfo"] && $.__views.submit.addEventListener("click", submitInfo);
    __defers["$.__views.cancel!click!closeWindow"] && $.__views.cancel.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;