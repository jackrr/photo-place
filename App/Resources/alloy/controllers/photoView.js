function Controller() {
    function threadOverlay(tc, bc) {
        var overlay = graphicUtil.coloredRectView(tc, bc, .5);
        overlay.addEventListener("click", function() {
            fullPhoto();
        });
        return overlay;
    }
    function addPreview(threadPreview) {
        $.imageMapContainer.add(threadOverlay(threadPreview.get("topCorner"), threadPreview.get("bottomCorner"), threadPreview.get("id")));
    }
    function loadThreads() {
        self.threadsCollection.forPhoto(self.photo.id, {
            success: function(newThreads) {
                $.threadCount.text = "" + newThreads.models.length + " threads";
                _.each(newThreads.models, function(threadPreview) {
                    addPreview(threadPreview);
                });
            },
            error: function() {
                alert("Failed to get threads for photo");
            }
        });
    }
    function back() {
        self.closeWindow();
        self.destroy();
    }
    function fullPhoto() {
        Alloy.createController("largeImage", {
            photo: self.photo,
            threads: self.threadsCollection,
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
        height: "100%",
        width: "100%",
        id: "photoView"
    });
    $.__views.photoView && $.addTopLevelView($.__views.photoView);
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        opacity: "0.7",
        zIndex: 1,
        id: "__alloyId4"
    });
    $.__views.photoView.add($.__views.__alloyId4);
    back ? $.__views.__alloyId4.addEventListener("click", back) : __defers["$.__views.__alloyId4!click!back"] = true;
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "vertical",
        top: "15%",
        backgroundColor: "#ffffff",
        zIndex: 2,
        height: "70%",
        width: "80%",
        id: "__alloyId5"
    });
    $.__views.photoView.add($.__views.__alloyId5);
    $.__views.imageMapContainer = Ti.UI.createView({
        layout: "composite",
        top: 30,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        backgroundColor: "#333333",
        id: "imageMapContainer"
    });
    $.__views.__alloyId5.add($.__views.imageMapContainer);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.imageMapContainer.add($.__views.image);
    fullPhoto ? $.__views.image.addEventListener("click", fullPhoto) : __defers["$.__views.image!click!fullPhoto"] = true;
    $.__views.__alloyId6 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.caption = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        id: "caption"
    });
    $.__views.__alloyId6.add($.__views.caption);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId7"
    });
    $.__views.__alloyId5.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        left: 10,
        text: "By User:",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.userName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        id: "userName"
    });
    $.__views.__alloyId7.add($.__views.userName);
    openUser ? $.__views.userName.addEventListener("click", openUser) : __defers["$.__views.userName!click!openUser"] = true;
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId9"
    });
    $.__views.__alloyId5.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        left: 10,
        text: "Taken at:",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.placeName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        id: "placeName"
    });
    $.__views.__alloyId9.add($.__views.placeName);
    openPlace ? $.__views.placeName.addEventListener("click", openPlace) : __defers["$.__views.placeName!click!openPlace"] = true;
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: 40,
        id: "__alloyId11"
    });
    $.__views.__alloyId5.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        left: 10,
        text: "Uploaded:",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.uploadDate = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        id: "uploadDate"
    });
    $.__views.__alloyId11.add($.__views.uploadDate);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        id: "__alloyId13"
    });
    $.__views.__alloyId5.add($.__views.__alloyId13);
    $.__views.threadCount = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        id: "threadCount"
    });
    $.__views.__alloyId13.add($.__views.threadCount);
    fullPhoto ? $.__views.threadCount.addEventListener("click", fullPhoto) : __defers["$.__views.threadCount!click!fullPhoto"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dateUtil = require("dateUtil");
    var graphicUtil = require("graphicUtil");
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
    $.photoView.addEventListener("android:back", function() {
        back();
    });
    self.openWindow = function(options) {
        options && options.update && loadThreads();
        $.photoView.open();
    };
    var args = arguments[0] || {};
    var parent = args.parent;
    self.setPhoto(args.photo);
    self.threadsCollection = Alloy.createCollection("threadPreview");
    loadThreads();
    $.photoView.open();
    __defers["$.__views.__alloyId4!click!back"] && $.__views.__alloyId4.addEventListener("click", back);
    __defers["$.__views.image!click!fullPhoto"] && $.__views.image.addEventListener("click", fullPhoto);
    __defers["$.__views.userName!click!openUser"] && $.__views.userName.addEventListener("click", openUser);
    __defers["$.__views.placeName!click!openPlace"] && $.__views.placeName.addEventListener("click", openPlace);
    __defers["$.__views.threadCount!click!fullPhoto"] && $.__views.threadCount.addEventListener("click", fullPhoto);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;