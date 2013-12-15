function Controller() {
    function done() {
        photo.setImage(image, place, $.caption.value);
        self.exit();
    }
    function cancel() {
        self.exit();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "photoUpload";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.photoUpload = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "white",
        id: "photoUpload"
    });
    $.__views.photoUpload && $.addTopLevelView($.__views.photoUpload);
    $.__views.imageView = Ti.UI.createImageView({
        top: 30,
        height: 80,
        id: "imageView"
    });
    $.__views.photoUpload.add($.__views.imageView);
    $.__views.caption = Ti.UI.createTextField({
        top: 20,
        hintText: "photo caption",
        width: 250,
        id: "caption"
    });
    $.__views.photoUpload.add($.__views.caption);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        top: 10,
        text: "Taken at:",
        id: "__alloyId1"
    });
    $.__views.photoUpload.add($.__views.__alloyId1);
    $.__views.placeName = Ti.UI.createLabel({
        top: 10,
        id: "placeName"
    });
    $.__views.photoUpload.add($.__views.placeName);
    $.__views.submit = Ti.UI.createLabel({
        top: 10,
        text: "Upload Photo!",
        id: "submit"
    });
    $.__views.photoUpload.add($.__views.submit);
    done ? $.__views.submit.addEventListener("click", done) : __defers["$.__views.submit!click!done"] = true;
    $.__views.cancel = Ti.UI.createLabel({
        top: 10,
        text: "Cancel",
        id: "cancel"
    });
    $.__views.photoUpload.add($.__views.cancel);
    cancel ? $.__views.cancel.addEventListener("click", cancel) : __defers["$.__views.cancel!click!cancel"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var parent = args.parent;
    var image = args.image;
    var place = args.place;
    var self = this;
    var photo = Alloy.createModel("photo");
    $.imageView.image = image;
    $.placeName.text = place.name;
    $.photoUpload.open();
    self.exit = function() {
        self.destroy();
        $.photoUpload.close();
        parent.openWindow();
    };
    __defers["$.__views.submit!click!done"] && $.__views.submit.addEventListener("click", done);
    __defers["$.__views.cancel!click!cancel"] && $.__views.cancel.addEventListener("click", cancel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;