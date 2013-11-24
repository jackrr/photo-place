function Controller() {
    function getImageFromServer() {
        var url = serverUrl;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                alert("Success!");
                $.image.setImage(imagePath);
            },
            onerror: function(e) {
                alert("Failure: " + e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function getTextFromServer() {
        var url = serverUrl;
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                alert("Success!");
                $.label.setText(client.getResponseData().getText());
            },
            onerror: function(e) {
                alert("Failure: " + e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Hello, World",
        id: "label",
        top: "30"
    });
    $.__views.index.add($.__views.label);
    getTextFromServer ? $.__views.label.addEventListener("click", getTextFromServer) : __defers["$.__views.label!click!getTextFromServer"] = true;
    $.__views.imageLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Get photo",
        id: "imageLabel",
        top: "50"
    });
    $.__views.index.add($.__views.imageLabel);
    getImageFromServer ? $.__views.imageLabel.addEventListener("click", getImageFromServer) : __defers["$.__views.imageLabel!click!getImageFromServer"] = true;
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        top: "70",
        image: ""
    });
    $.__views.index.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var serverUrl = "http://127.0.0.1:3000";
    $.index.open();
    __defers["$.__views.label!click!getTextFromServer"] && $.__views.label.addEventListener("click", getTextFromServer);
    __defers["$.__views.imageLabel!click!getImageFromServer"] && $.__views.imageLabel.addEventListener("click", getImageFromServer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;