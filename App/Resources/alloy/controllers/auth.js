function Controller() {
    function submitInfo() {
        if ("" == $.username.value || "" == $.password1.value || "" == $.password2.value) alert("All fields are required"); else if ($.password1.value != $.password2.value) alert("Passwords do not match"); else {
            var newUser = {
                username: $.username.value,
                password: Titatnium.Utils.md5HexDigest($.password1.value)
            };
            Ti.API.info("username: " + newUser.username + "\nhex digest: " + newUser.password + "\npassword: " + $.password1.value);
            Ti.App.Properties.setObject("authInfo", newUser);
            var http = Ti.Network.createHTTPClient({
                onload: function() {
                    alert("New user added");
                },
                onerror: function() {
                    alert("Error adding user");
                }
            });
            http.open("POST", "https://127.0.0.1:3000/users");
            http.send(JSON.stringify(newUser));
            $.auth.close();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "auth";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.winlabel = Ti.UI.createLabel({
        top: 50,
        text: "Create Account",
        id: "winlabel"
    });
    $.__views.win.add($.__views.winlabel);
    $.__views.email = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: Ti.UI.SIZE,
        hintText: "Email",
        id: "email"
    });
    $.__views.win.add($.__views.email);
    $.__views.username = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: Ti.UI.SIZE,
        hintText: "Username",
        id: "username"
    });
    $.__views.win.add($.__views.username);
    $.__views.password1 = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: Ti.UI.SIZE,
        hintText: "Password",
        passwordMask: true,
        id: "password1"
    });
    $.__views.win.add($.__views.password1);
    $.__views.password2 = Ti.UI.createTextField({
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        autocorrect: false,
        width: Ti.UI.SIZE,
        hintText: "Re-enter Password",
        passwordMask: true,
        id: "password2"
    });
    $.__views.win.add($.__views.password2);
    $.__views.submit = Ti.UI.createLabel({
        top: 10,
        touchEnabled: true,
        text: "Submit",
        id: "submit"
    });
    $.__views.win.add($.__views.submit);
    submitInfo ? $.__views.submit.addEventListener("click", submitInfo) : __defers["$.__views.submit!click!submitInfo"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.submit!click!submitInfo"] && $.__views.submit.addEventListener("click", submitInfo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;