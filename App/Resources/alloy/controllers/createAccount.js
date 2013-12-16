function Controller() {
    function closeWindow(nextController) {
        Alloy.createController(nextController);
        $.createAccount.close();
        $.destroy();
    }
    function checkEmail(email) {
        if (new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$").test(email)) return true;
        Ti.UI.createAlertDialog({
            message: "Email address is improperly formatted"
        }).show();
        return false;
    }
    function checkUsername(username) {
        var myAlert = Ti.UI.createAlertDialog({
            message: ""
        });
        "" == username ? myAlert.setMessage("Please fill in all fields") : username.length > 15 ? myAlert.setMessage("Username must be less than 15 characters long") : new RegExp("^[a-zA-Z0-9]+$").test(username) || myAlert.setMessage("Username may only contain letters and numbers");
        if ("" == myAlert.message) return true;
        myAlert.show();
        return false;
    }
    function checkPassword(password1, password2) {
        var myAlert = Ti.UI.createAlertDialog({
            message: ""
        });
        "" == password1 || "" == password2 ? myAlert.setMessage("Please fill in all fields") : password1 != password2 ? myAlert.setMessage("Passwords do not match") : 6 > password1.length && myAlert.setMessage("Passwords must be at least 6 characters long");
        if ("" == myAlert.message) return true;
        myAlert.show();
        return false;
    }
    function submitInfo() {
        if (checkEmail($.email.value) && checkUsername($.username.value) && checkPassword($.password1.value, $.password2.value)) {
            user.set({
                username: $.username.value,
                password: $.password1.value,
                email: $.email.value
            });
            user.save(user, {
                success: function() {
                    Ti.API.info(JSON.stringify(user));
                    Ti.App.Properties.setObject("authInfo", {
                        username: user.get("username"),
                        email: user.get("email"),
                        id: user.get("_id")
                    });
                    Ti.App.fireEvent("signIn");
                    closeWindow("photoGallery");
                },
                error: function(user, err) {
                    Ti.API.info("err " + JSON.stringify(err.err));
                    var errAlert = Ti.UI.createAlertDialog({
                        title: "Whoops!",
                        message: err
                    });
                    11e3 == err.err.code && errAlert.setMessage("That username is already taken");
                    errAlert.show();
                }
            });
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
        backgroundColor: Alloy.CFG.cream,
        fullscreen: true,
        layout: "vertical",
        backgroundImage: "/images/welcome-background.png",
        id: "createAccount"
    });
    $.__views.createAccount && $.addTopLevelView($.__views.createAccount);
    $.__views.winlabel = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 150,
        width: Ti.UI.SIZE,
        font: {
            fontSize: 20
        },
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
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 20,
        width: Ti.UI.SIZE,
        text: "Submit",
        id: "submit"
    });
    $.__views.createAccount.add($.__views.submit);
    submitInfo ? $.__views.submit.addEventListener("click", submitInfo) : __defers["$.__views.submit!click!submitInfo"] = true;
    $.__views.cancel = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        width: Ti.UI.SIZE,
        text: "Back",
        id: "cancel"
    });
    $.__views.createAccount.add($.__views.cancel);
    closeWindow ? $.__views.cancel.addEventListener("click", closeWindow) : __defers["$.__views.cancel!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user");
    $.createAccount.open();
    $.createAccount.addEventListener("android:back", function() {
        closeWindow("auth");
    });
    __defers["$.__views.submit!click!submitInfo"] && $.__views.submit.addEventListener("click", submitInfo);
    __defers["$.__views.cancel!click!closeWindow"] && $.__views.cancel.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;