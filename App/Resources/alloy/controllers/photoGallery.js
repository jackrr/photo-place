function Controller() {
    function openPhotos(newPhotos) {
        var rows = [];
        _.each(newPhotos.models, function(photo) {
            var row = Alloy.createController("galleryPhoto", {
                photo: photo
            }).getView();
            rows.push(row);
        });
        $.tableView.setData(rows);
    }
    function clickLabel() {
        photos.fetch({
            success: function() {
                openPhotos(photos);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "photoGallery";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.photoGallery = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "photoGallery"
    });
    $.__views.photoGallery && $.addTopLevelView($.__views.photoGallery);
    $.__views.loadPhoto = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "10",
        color: "#000",
        text: "Click to fetch!",
        id: "loadPhoto"
    });
    $.__views.photoGallery.add($.__views.loadPhoto);
    clickLabel ? $.__views.loadPhoto.addEventListener("click", clickLabel) : __defers["$.__views.loadPhoto!click!clickLabel"] = true;
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.photoGallery.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var photos = Alloy.createCollection("photo");
    $.photoGallery.open();
    __defers["$.__views.loadPhoto!click!clickLabel"] && $.__views.loadPhoto.addEventListener("click", clickLabel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;