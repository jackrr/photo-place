function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "galleryPhoto";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowView = Ti.UI.createTableViewRow({
        id: "rowView"
    });
    $.__views.rowView && $.addTopLevelView($.__views.rowView);
    $.__views.imageView = Ti.UI.createImageView({
        id: "imageView"
    });
    $.__views.rowView.add($.__views.imageView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var photo = args.photo;
    $.rowView.title = photo.get("name");
    $.imageView.image = photo.get("image");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;