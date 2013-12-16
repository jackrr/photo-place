function Controller() {
    function openPhotoView() {
        Alloy.createController("photoView", {
            photo: photo,
            parent: parent
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "galleryRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.rowView = Ti.UI.createTableViewRow({
        height: 100,
        backgroundColor: "transparent",
        id: "rowView"
    });
    $.__views.rowView && $.addTopLevelView($.__views.rowView);
    openPhotoView ? $.__views.rowView.addEventListener("click", openPhotoView) : __defers["$.__views.rowView!click!openPhotoView"] = true;
    $.__views.imageView = Ti.UI.createImageView({
        left: 5,
        top: 4,
        id: "imageView"
    });
    $.__views.rowView.add($.__views.imageView);
    $.__views.userName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        right: 20,
        top: 20,
        id: "userName"
    });
    $.__views.rowView.add($.__views.userName);
    $.__views.placeName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        right: 20,
        top: 50,
        id: "placeName"
    });
    $.__views.rowView.add($.__views.placeName);
    $.__views.uploadDate = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        left: 5,
        bottom: 2,
        font: {
            fontSize: 10
        },
        id: "uploadDate"
    });
    $.__views.rowView.add($.__views.uploadDate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dateUtil = require("dateUtil");
    var args = arguments[0] || {};
    var photo = args.photo;
    var parent = args.parent;
    $.userName.text = photo.get("userName");
    $.placeName.text = photo.get("placeName");
    $.uploadDate.text = dateUtil.prettyDate(photo.get("createdDate"));
    $.imageView.image = photo.get("smallPath");
    __defers["$.__views.rowView!click!openPhotoView"] && $.__views.rowView.addEventListener("click", openPhotoView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;