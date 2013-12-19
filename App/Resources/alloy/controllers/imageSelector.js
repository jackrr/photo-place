function Controller() {
    function cancel() {
        $.imageSelector.close();
        self.destroy();
        parent.openWindow(false);
    }
    function done() {
        var topCorner = {
            x: left,
            y: top
        };
        var bottomCorner = {
            x: left + width,
            y: top + height
        };
        self.destroy();
        thread.save({
            topCorner: topCorner,
            bottomCorner: bottomCorner,
            name: $.name.value
        }, {
            success: function() {
                $.imageSelector.close();
                self.destroy();
                parent.openWindow({
                    update: true
                });
            },
            error: function() {
                alert("Failed to create thread");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "imageSelector";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.imageSelector = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.cream,
        fullscreen: true,
        orientationModes: [ Ti.UI.PORTRAIT ],
        layout: "vertical",
        id: "imageSelector"
    });
    $.__views.imageSelector && $.addTopLevelView($.__views.imageSelector);
    $.__views.imageArea = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 30,
        layout: "composite",
        id: "imageArea"
    });
    $.__views.imageSelector.add($.__views.imageArea);
    $.__views.overlayRegion = Ti.UI.createView({
        opacity: "0.4",
        zIndex: 1,
        height: 0,
        width: 0,
        id: "overlayRegion"
    });
    $.__views.imageArea.add($.__views.overlayRegion);
    $.__views.image = Ti.UI.createImageView({
        id: "image"
    });
    $.__views.imageArea.add($.__views.image);
    $.__views.textInteracts = Ti.UI.createView({
        layout: "vertical",
        id: "textInteracts"
    });
    $.__views.imageSelector.add($.__views.textInteracts);
    $.__views.nameArea = Ti.UI.createView({
        top: 5,
        height: 40,
        color: "black",
        witdth: "100%",
        id: "nameArea"
    });
    $.__views.textInteracts.add($.__views.nameArea);
    $.__views.name = Ti.UI.createTextField({
        hintText: L("addComment"),
        id: "name"
    });
    $.__views.nameArea.add($.__views.name);
    $.__views.doneArea = Ti.UI.createView({
        top: 15,
        height: 40,
        color: "black",
        witdth: "100%",
        id: "doneArea"
    });
    $.__views.textInteracts.add($.__views.doneArea);
    $.__views.cancel = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        text: L("cancel"),
        font: {
            fontSize: 12
        },
        left: "25%",
        id: "cancel"
    });
    $.__views.doneArea.add($.__views.cancel);
    cancel ? $.__views.cancel.addEventListener("click", cancel) : __defers["$.__views.cancel!click!cancel"] = true;
    $.__views.done = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        text: L("done"),
        font: {
            fontSize: 12
        },
        right: "25%",
        id: "done"
    });
    $.__views.doneArea.add($.__views.done);
    done ? $.__views.done.addEventListener("click", done) : __defers["$.__views.done!click!done"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var self = this;
    var GraphicUtil = require("graphicUtil");
    var args = arguments[0] || {};
    var parent = args.parent;
    var photo = args.photo;
    var thread = Alloy.createModel("Thread", {
        photoID: photo.id,
        userID: Ti.App.Properties.getObject("authInfo").id
    });
    var top = 0, left = 0, height = 0, width = 0;
    var p1 = {
        x: 0,
        y: 0
    };
    var p2 = {
        x: 0,
        y: 0
    };
    $.image.image = photo.get("largePath");
    self.imageSelector.open();
    $.image.addEventListener("touchstart", function(e) {
        $.overlayRegion.backgroundColor = GraphicUtil.randomColor();
        left = e.x;
        top = e.y;
        p1.x = e.x;
        p1.y = e.y;
    });
    $.image.addEventListener("touchmove", function(e) {
        p2.x = e.x;
        p2.y = e.y;
        if (p2.x < p1.x) {
            left = p2.x;
            width = p1.x - p2.x;
        } else {
            left = p1.x;
            width = p2.x - p1.x;
        }
        if (p2.y < p1.y) {
            top = p2.y;
            height = p1.y - p2.y;
        } else {
            top = p1.y;
            height = p2.y - p1.y;
        }
        $.overlayRegion.top = top;
        $.overlayRegion.left = left;
        $.overlayRegion.height = height;
        $.overlayRegion.width = width;
    });
    $.imageSelector.addEventListener("android:back", function() {
        cancel();
    });
    __defers["$.__views.cancel!click!cancel"] && $.__views.cancel.addEventListener("click", cancel);
    __defers["$.__views.done!click!done"] && $.__views.done.addEventListener("click", done);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;