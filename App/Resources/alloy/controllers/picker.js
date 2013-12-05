function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "picker";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        id: "win",
        backgroundColor: "white",
        layout: "vertical",
        exitOnClose: "true"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.thePicker = Ti.UI.createPicker({
        id: "thePicker",
        top: "50",
        selectionIndicator: "true"
    });
    $.__views.win.add($.__views.thePicker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var self = this;
    self.setRows = function(rows) {
        $.thePicker.add(rows);
    };
    self.open = function() {
        $.picker.open();
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;