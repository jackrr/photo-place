function Controller() {
    function back() {
        self.closeWindow();
        self.destroy();
        parent.openWindow();
    }
    function fullPhoto() {
        Alloy.createController("largeImage", {
            photo: self.photo,
            parent: self
        });
        self.closeWindow();
    }
    function openUser() {
        parent.byUser(self.photo.get("userID"));
        back();
    }
    function openPlace() {
        parent.byPlace(self.photo.get("placeID"));
        back();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "photoView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.photoView = Ti.UI.createWindow({
        backgroundColor: "white",
        fullscreen: true,
        layout: "vertical",
        id: "photoView"
    });
    $.__views.photoView && $.addTopLevelView($.__views.photoView);
    $.__views.image = Ti.UI.createImageView({
        top: 30,
        id: "image"
    });
    $.__views.photoView.add($.__views.image);
    fullPhoto ? $.__views.image.addEventListener("click", fullPhoto) : __defers["$.__views.image!click!fullPhoto"] = true;
    $.__views.__alloyId2 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId2"
    });
    $.__views.photoView.add($.__views.__alloyId2);
    $.__views.caption = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "caption"
    });
    $.__views.__alloyId2.add($.__views.caption);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId3"
    });
    $.__views.photoView.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: 10,
        text: "By User:",
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.userName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "userName"
    });
    $.__views.__alloyId3.add($.__views.userName);
    openUser ? $.__views.userName.addEventListener("click", openUser) : __defers["$.__views.userName!click!openUser"] = true;
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId5"
    });
    $.__views.photoView.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: 10,
        text: "Taken at:",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.placeName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "placeName"
    });
    $.__views.__alloyId5.add($.__views.placeName);
    openPlace ? $.__views.placeName.addEventListener("click", openPlace) : __defers["$.__views.placeName!click!openPlace"] = true;
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId7"
    });
    $.__views.photoView.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: 10,
        text: "Uploaded:",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.uploadDate = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "uploadDate"
    });
    $.__views.__alloyId7.add($.__views.uploadDate);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Back",
        id: "__alloyId9"
    });
    $.__views.photoView.add($.__views.__alloyId9);
    back ? $.__views.__alloyId9.addEventListener("click", back) : __defers["$.__views.__alloyId9!click!back"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dateUtil = require("dateUtil");
    var self = this;
    self.setPhoto = function(photo) {
        self.photo = photo;
        $.caption.text = '"' + photo.get("caption") + '"';
        $.userName.text = photo.get("userName");
        $.placeName.text = photo.get("placeName");
        $.uploadDate.text = dateUtil.prettyDate(photo.get("createdDate"));
        $.image.image = photo.get("mediumPath");
    };
    self.closeWindow = function() {
        $.photoView.close();
    };
    self.openWindow = function() {
        $.photoView.open();
    };
    var args = arguments[0] || {};
    var parent = args.parent;
    self.setPhoto(args.photo);
    $.photoView.open();
    __defers["$.__views.image!click!fullPhoto"] && $.__views.image.addEventListener("click", fullPhoto);
    __defers["$.__views.userName!click!openUser"] && $.__views.userName.addEventListener("click", openUser);
    __defers["$.__views.placeName!click!openPlace"] && $.__views.placeName.addEventListener("click", openPlace);
    __defers["$.__views.__alloyId9!click!back"] && $.__views.__alloyId9.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;