function Controller() {
    function loadThreads() {
        data = [];
        _.each(threadsCollection.models, function(threadPreview) {
            data.push({
                text: threadPreview.get("name")
            });
        });
        threadSlider.setData(data);
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
        height: 40,
        backgroundColor: Alloy.CFG.darkRed,
        width: "100%",
        id: "titleBar"
    });
    $.__views.largeImage.add($.__views.titleBar);
    $.__views.back = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        text: L("back"),
        left: 10,
        id: "back"
    });
    $.__views.titleBar.add($.__views.back);
    back ? $.__views.back.addEventListener("click", back) : __defers["$.__views.back!click!back"] = true;
    $.__views.caption = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        height: "auto",
        font: {
            fontSize: 12
        },
        id: "caption"
    });
    $.__views.titleBar.add($.__views.caption);
    $.__views.newThread = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        top: 10,
        text: L("add"),
        right: 10,
        id: "newThread"
    });
    $.__views.titleBar.add($.__views.newThread);
    newThread ? $.__views.newThread.addEventListener("click", newThread) : __defers["$.__views.newThread!click!newThread"] = true;
    $.__views.threadObject = Ti.UI.createView({
        height: 40,
        id: "threadObject"
    });
    $.__views.largeImage.add($.__views.threadObject);
    $.__views.imageMapContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        layout: "composite",
        id: "imageMapContainer"
    });
    $.__views.largeImage.add($.__views.imageMapContainer);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.imageMapContainer.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("dateUtil");
    require("graphicUtil");
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
    var threadSlider = new BetterPicker({
        data: testArray,
        height: 40
    });
    $.threadObject.add(threadSlider);
    $.image.image = photo.get("largePath");
    $.caption.text = '"' + photo.get("caption") + '"';
    loadThreads();
    $.image.setTop($.largeImage.getWidth() - $.image.getWidth());
    $.largeImage.open();
    __defers["$.__views.back!click!back"] && $.__views.back.addEventListener("click", back);
    __defers["$.__views.newThread!click!newThread"] && $.__views.newThread.addEventListener("click", newThread);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;