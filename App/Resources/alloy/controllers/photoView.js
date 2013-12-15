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
                Ti.API.info(JSON.stringify(newThreads));
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
        parent.openWindow();
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
    function newThread() {
        Alloy.createController("imageSelector", {
            photo: self.photo,
            parent: self
        });
        self.closeWindow();
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
    $.__views.imageMapContainer = Ti.UI.createView({
        layout: "composite",
        top: 30,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "imageMapContainer"
    });
    $.__views.photoView.add($.__views.imageMapContainer);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.imageMapContainer.add($.__views.image);
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
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        top: 10,
        color: "black",
        id: "__alloyId9"
    });
    $.__views.photoView.add($.__views.__alloyId9);
    $.__views.newThread = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Make new thread",
        id: "newThread"
    });
    $.__views.__alloyId9.add($.__views.newThread);
    newThread ? $.__views.newThread.addEventListener("click", newThread) : __defers["$.__views.newThread!click!newThread"] = true;
    $.__views.threads = Ti.UI.createTableView({
        id: "threads"
    });
    $.__views.__alloyId9.add($.__views.threads);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: "Back",
        id: "__alloyId10"
    });
    $.__views.photoView.add($.__views.__alloyId10);
    back ? $.__views.__alloyId10.addEventListener("click", back) : __defers["$.__views.__alloyId10!click!back"] = true;
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
    __defers["$.__views.image!click!fullPhoto"] && $.__views.image.addEventListener("click", fullPhoto);
    __defers["$.__views.userName!click!openUser"] && $.__views.userName.addEventListener("click", openUser);
    __defers["$.__views.placeName!click!openPlace"] && $.__views.placeName.addEventListener("click", openPlace);
    __defers["$.__views.newThread!click!newThread"] && $.__views.newThread.addEventListener("click", newThread);
    __defers["$.__views.__alloyId10!click!back"] && $.__views.__alloyId10.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;