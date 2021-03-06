function Controller() {
    function openUserOptions() {
        Alloy.createController("auth");
    }
    function openUserList() {
        Alloy.createController("user", {
            parent: self
        });
        self.closeWindow();
    }
    function openPhotoOpts() {
        Alloy.createController("photoGallery", {
            parent: self
        });
        self.closeWindow();
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
        backgroundColor: Alloy.CFG.cream,
        fullscreen: true,
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.title = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 30,
        id: "title"
    });
    $.__views.index.add($.__views.title);
    $.__views.userPage = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 30,
        text: "List of Users",
        id: "userPage"
    });
    $.__views.index.add($.__views.userPage);
    openUserList ? $.__views.userPage.addEventListener("click", openUserList) : __defers["$.__views.userPage!click!openUserList"] = true;
    $.__views.addUser = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 30,
        text: "Create Account / Log In",
        id: "addUser"
    });
    $.__views.index.add($.__views.addUser);
    openUserOptions ? $.__views.addUser.addEventListener("click", openUserOptions) : __defers["$.__views.addUser!click!openUserOptions"] = true;
    $.__views.photoOpts = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 30,
        text: "Photo Menu",
        id: "photoOpts"
    });
    $.__views.index.add($.__views.photoOpts);
    openPhotoOpts ? $.__views.photoOpts.addEventListener("click", openPhotoOpts) : __defers["$.__views.photoOpts!click!openPhotoOpts"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var LocationUtil = require("locationUtil");
    var self = this;
    self.closeWindow = function() {
        $.index.close();
    };
    self.openWindow = function() {
        $.index.open();
    };
    Ti.App.addEventListener("resumed", function() {
        Ti.API.info("Activity resumed");
        LocationUtil.checkForLocationUpdate();
    });
    Ti.App.addEventListener("signIn", function() {
        Ti.API.info("signIn event");
        LocationUtil.checkForLocationUpdate();
    });
    if (Ti.App.Properties.getObject("authInfo", false)) {
        Ti.API.info("authInfo property found, opening home page");
        openPhotoOpts();
    } else {
        Ti.API.info("No authInfo property found");
        openUserOptions();
    }
    __defers["$.__views.userPage!click!openUserList"] && $.__views.userPage.addEventListener("click", openUserList);
    __defers["$.__views.addUser!click!openUserOptions"] && $.__views.addUser.addEventListener("click", openUserOptions);
    __defers["$.__views.photoOpts!click!openPhotoOpts"] && $.__views.photoOpts.addEventListener("click", openPhotoOpts);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;