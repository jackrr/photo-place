function Controller() {
    function nameClick() {
        Ti.API.info("clicked " + self.currentThreadID);
    }
    function changeThreadName(threadPreview) {
        Ti.API.info("in change name: " + threadPreview.get("name"));
        self.currentThreadID || $.threadName.addEventListener("click", nameClick);
        $.threadName.text = threadPreview.get("name");
        self.currentThreadID = threadPreview.id;
    }
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
        layout: "vertical",
        id: "largeImage"
    });
    $.__views.largeImage && $.addTopLevelView($.__views.largeImage);
    $.__views.threadName = Ti.UI.createLabel({
        color: "white",
        top: 10,
        id: "threadName"
    });
    $.__views.largeImage.add($.__views.threadName);
    $.__views.imageMapContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 30,
        layout: "composite",
        id: "imageMapContainer"
    });
    $.__views.largeImage.add($.__views.imageMapContainer);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.imageMapContainer.add($.__views.image);
    $.__views.caption = Ti.UI.createLabel({
        color: "white",
        top: 20,
        backgroundColor: "black",
        id: "caption"
    });
    $.__views.largeImage.add($.__views.caption);
    $.__views.back = Ti.UI.createLabel({
        color: "white",
        top: 10,
        text: "Back",
        id: "back"
    });
    $.__views.largeImage.add($.__views.back);
    back ? $.__views.back.addEventListener("click", back) : __defers["$.__views.back!click!back"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("dateUtil");
    var graphicUtil = require("graphicUtil");
    var self = this;
    var args = arguments[0] || {};
    var parent = args.parent;
    var photo = args.photo;
    var threadsCollection = args.threads;
    $.largeImage.addEventListener("android:back", function() {
        back();
    });
    $.image.image = photo.get("largePath");
    $.caption.text = '"' + photo.get("caption") + '"';
    loadThreads();
    $.largeImage.open();
    __defers["$.__views.back!click!back"] && $.__views.back.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;