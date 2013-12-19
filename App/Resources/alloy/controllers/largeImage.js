function Controller() {
    function threadOverlay(threadPreview) {
        var overlay = graphicUtil.coloredRectView(threadPreview.get("topCorner"), threadPreview.get("bottomCorner"), 1);
        var preview = threadPreview;
        overlay.addEventListener("click", function() {
            Ti.API.info("clicked: " + threadPreview.get("name"));
            changeThreadName(preview);
        });
        return overlay;
    }
    function addPreview(threadPreview) {
        $.imageMapContainer.add(threadOverlay(threadPreview));
    }
    function loadThreads() {
        _.each(threadsCollection.models, function(threadPreview) {
            addPreview(threadPreview);
        });
    }
    function refreshThreads() {
        threadsCollection.forPhoto(photo.id, {
            success: function() {
                loadThreads();
            },
            error: function() {
                alert("Failed to get threads for photo");
            }
        });
    }
    function newThread() {
        Alloy.createController("imageSelector", {
            photo: photo,
            parent: self
        });
        self.closeWindow();
    }
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
        backgroundColor: Alloy.CFG.cream,
        fullscreen: true,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT ],
        layout: "vertical",
        id: "largeImage"
    });
    $.__views.largeImage && $.addTopLevelView($.__views.largeImage);
    $.__views.titleBar = Ti.UI.createView({
        layout: "composite",
        height: 40,
        id: "titleBar"
    });
    $.__views.largeImage.add($.__views.titleBar);
    $.__views.title = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: "left",
        color: "black",
        top: 10,
        left: 5,
        font: {
            fontSize: 12
        },
        id: "title"
    });
    $.__views.titleBar.add($.__views.title);
    $.__views.titleDate = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: "right",
        color: "black",
        top: 10,
        right: 5,
        font: {
            fontSize: 12
        },
        id: "titleDate"
    });
    $.__views.titleBar.add($.__views.titleDate);
    $.__views.imageMapContainer = Ti.UI.createView({
        top: 10,
        height: 300,
        width: Ti.UI.SIZE,
        layout: "composite",
        id: "imageMapContainer"
    });
    $.__views.largeImage.add($.__views.imageMapContainer);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.imageMapContainer.add($.__views.image);
    $.__views.caption = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        font: {
            fontSize: 12
        },
        id: "caption"
    });
    $.__views.largeImage.add($.__views.caption);
    $.__views.threadObject = Ti.UI.createView({
        height: 40,
        id: "threadObject"
    });
    $.__views.largeImage.add($.__views.threadObject);
    $.__views.actionBar = Ti.UI.createView({
        layout: "composite",
        top: 10,
        id: "actionBar"
    });
    $.__views.largeImage.add($.__views.actionBar);
    $.__views.newThread = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        text: L("addThread"),
        left: 20,
        id: "newThread"
    });
    $.__views.actionBar.add($.__views.newThread);
    newThread ? $.__views.newThread.addEventListener("click", newThread) : __defers["$.__views.newThread!click!newThread"] = true;
    $.__views.back = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        text: L("back"),
        right: 20,
        id: "back"
    });
    $.__views.actionBar.add($.__views.back);
    back ? $.__views.back.addEventListener("click", back) : __defers["$.__views.back!click!back"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dateUtil = require("dateUtil");
    var graphicUtil = require("graphicUtil");
    var BetterPicker = require("betterPicker");
    var self = this;
    var testArray = [ "One fish two fish", "Green eggs and ham", "How the Grinch stole", "Yurtle the Turtle", "Ten apples up on top" ];
    var args = arguments[0] || {};
    var parent = args.parent;
    var photo = args.photo;
    var threadsCollection = args.threads;
    self.closeWindow = function() {
        $.largeImage.close();
    };
    self.openWindow = function(options) {
        options.update && refreshThreads();
        $.largeImage.open();
    };
    $.largeImage.addEventListener("android:back", function() {
        back();
    });
    $.threadObject.add(new BetterPicker({
        data: testArray,
        height: 40
    }));
    $.image.image = photo.get("largePath");
    $.caption.text = '"' + photo.get("caption") + '"';
    $.title.text = photo.get("userName") + " at\n" + photo.get("placeName");
    $.titleDate.text = dateUtil.prettyDate(photo.get("createdDate"));
    loadThreads();
    $.largeImage.open();
    Ti.API.info(JSON.stringify(self));
    __defers["$.__views.newThread!click!newThread"] && $.__views.newThread.addEventListener("click", newThread);
    __defers["$.__views.back!click!back"] && $.__views.back.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;