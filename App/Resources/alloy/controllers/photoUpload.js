function Controller() {
    function done() {
        photo.setImage(image, place, $.caption.value);
        self.back();
    }
    function back() {
        self.back();
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
        height: "100%",
        width: "100%",
        id: "photoUpload"
    });
    $.__views.photoUpload && $.addTopLevelView($.__views.photoUpload);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        opacity: "0.7",
        zIndex: 1,
        id: "__alloyId1"
    });
    $.__views.photoUpload.add($.__views.__alloyId1);
    back ? $.__views.__alloyId1.addEventListener("click", back) : __defers["$.__views.__alloyId1!click!back"] = true;
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        zIndex: 2,
        top: "25%",
        height: "50%",
        width: "80%",
        layout: "vertical",
        id: "__alloyId2"
    });
    $.__views.photoUpload.add($.__views.__alloyId2);
    $.__views.imageView = Ti.UI.createImageView({
        top: 30,
        height: 80,
        id: "imageView"
    });
    $.__views.__alloyId2.add($.__views.imageView);
    $.__views.caption = Ti.UI.createTextField({
        top: 20,
        hintText: "photo caption",
        width: 250,
        id: "caption"
    });
    $.__views.__alloyId2.add($.__views.caption);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        text: "Taken at:",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.placeName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        id: "placeName"
    });
    $.__views.__alloyId2.add($.__views.placeName);
    $.__views.submit = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        text: "Upload Photo!",
        id: "submit"
    });
    $.__views.__alloyId2.add($.__views.submit);
    done ? $.__views.submit.addEventListener("click", done) : __defers["$.__views.submit!click!done"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parent;
    var image = args.image;
    var place = args.place;
    var self = this;
    var photo = Alloy.createModel("photo");
    $.imageView.image = image;
    $.placeName.text = place.name;
    $.photoUpload.open();
    self.back = function() {
        self.destroy();
        $.photoUpload.close();
    };
    __defers["$.__views.__alloyId1!click!back"] && $.__views.__alloyId1.addEventListener("click", back);
    __defers["$.__views.submit!click!done"] && $.__views.submit.addEventListener("click", done);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;