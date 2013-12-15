function Controller() {
    function back() {
        $.largeImage.close();
        self.destroy();
        parent.openWindow();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "largeImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.largeImage = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ],
        id: "largeImage"
    });
    $.__views.largeImage && $.addTopLevelView($.__views.largeImage);
    back ? $.__views.largeImage.addEventListener("click", back) : __defers["$.__views.largeImage!click!back"] = true;
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.largeImage.add($.__views.image);
    $.__views.caption = Ti.UI.createLabel({
        color: "white",
        backgroundColor: "black",
        bottom: 20,
        id: "caption"
    });
    $.__views.largeImage.add($.__views.caption);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("dateUtil");
    var self = this;
    var args = arguments[0] || {};
    var parent = args.parent;
    var photo = args.photo;
    $.image.image = photo.get("largePath");
    $.caption.text = '"' + photo.get("caption") + '"';
    $.largeImage.open();
    $.largeImage.addEventListener("android:back", function() {
        back();
    });
    __defers["$.__views.largeImage!click!back"] && $.__views.largeImage.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;