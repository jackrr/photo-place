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
                $.threadCount.text = "" + newThreads.models.length;
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
        height: "100%",
        width: "100%",
        backgroundColor: Alloy.CFG.whiteYellow,
        opacity: "0.7",
        zIndex: 1,
        id: "__alloyId4"
    });
    $.__views.photoView.add($.__views.__alloyId4);
    back ? $.__views.__alloyId4.addEventListener("click", back) : __defers["$.__views.__alloyId4!click!back"] = true;
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "white",
        zIndex: 2,
        borderWidth: 5,
        borderColor: "black",
        top: "15%",
        height: "70%",
        width: "80%",
        id: "__alloyId5"
    });
    $.__views.photoView.add($.__views.__alloyId5);
    $.__views.titleBar = Ti.UI.createView({
        layout: "composite",
        height: 50,
        id: "titleBar"
    });
    $.__views.__alloyId5.add($.__views.titleBar);
    $.__views.title = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: "left",
        color: "black",
        left: 15,
        font: {
            fontSize: 12
        },
        id: "title"
    });
    $.__views.titleBar.add($.__views.title);
    $.__views.threadCount = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: Alloy.CFG.darkRed,
        top: 5,
        right: 10,
        font: {
            fontSize: 18
        },
        backgroundImage: "/images/thread-bubble.png",
        width: 40,
        height: 40,
        id: "threadCount"
    });
    $.__views.titleBar.add($.__views.threadCount);
    $.__views.imageMapContainer = Ti.UI.createView({
        layout: "composite",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 10,
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
        width: "100%",
        textAlign: "center",
        height: 40,
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.caption = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        center: "50%",
        width: "90%",
        font: {
            fontSize: 12
        },
        id: "caption"
    });
    $.__views.__alloyId6.add($.__views.caption);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dateUtil = require("dateUtil");
    var graphicUtil = require("graphicUtil");
    var self = this;
    self.setPhoto = function(photo) {
        self.photo = photo;
        $.caption.text = '"' + photo.get("caption") + '"';
        $.title.text = photo.get("userName") + " at " + photo.get("placeName") + "\n" + dateUtil.prettyDate(photo.get("createdDate"));
        $.image.image = photo.get("mediumPath");
        $.threadCount.setBackgroundPaddingBottom(3);
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
    args.parent;
    self.setPhoto(args.photo);
    self.threadsCollection = Alloy.createCollection("threadPreview");
    loadThreads();
    $.photoView.open();
    __defers["$.__views.__alloyId4!click!back"] && $.__views.__alloyId4.addEventListener("click", back);
    __defers["$.__views.image!click!fullPhoto"] && $.__views.image.addEventListener("click", fullPhoto);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;