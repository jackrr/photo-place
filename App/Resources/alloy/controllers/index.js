function Controller() {
    function openUserPage() {
        Alloy.createController("user");
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
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.userPage = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Click to open users page",
        id: "userPage",
        top: "90"
    });
    $.__views.index.add($.__views.userPage);
    openUserPage ? $.__views.userPage.addEventListener("click", openUserPage) : __defers["$.__views.userPage!click!openUserPage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.createController("photoGallery");
    __defers["$.__views.userPage!click!openUserPage"] && $.__views.userPage.addEventListener("click", openUserPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;