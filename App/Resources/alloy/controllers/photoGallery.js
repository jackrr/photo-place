function Controller() {
    function closeWindow() {
        $.photoGallery.close();
    }
    function eliminate() {
        closeWindow();
        self.destroy();
        parent.openWindow();
    }
    function addPhotos(newPhotos) {
        var rows = [];
        _.each(newPhotos.models, function(photo) {
            var row = Alloy.createController("galleryRow", {
                photo: photo,
                parent: self
            }).getView();
            rows.push(row);
        });
        $.tableView.appendRow(rows);
        self.updating = false;
    }
    function changePhotos(newPhotos) {
        var rows = [];
        _.each(newPhotos.models, function(photo) {
            var row = Alloy.createController("galleryRow", {
                photo: photo,
                parent: self
            }).getView();
            rows.push(row);
        });
        $.tableView.setData(rows);
        self.updating = false;
    }
    function getLocation(cb) {
        ServerUtil.getNearbyPlaces(function(err, places) {
            if (err) return cb(err);
            Ti.API.info(JSON.stringify(places));
            var rows = [];
            var placeHash = {};
            _.each(places, function(place) {
                rows.push(Ti.UI.createPickerRow({
                    title: place.name,
                    value: place.id
                }));
                placeHash[place.id] = place;
            });
            var picker = Alloy.createController("picker");
            picker.setCallback(function(selectedRow) {
                cb(null, placeHash[selectedRow.value]);
            });
            picker.setRows(rows);
            picker.getView().open();
        });
    }
    function choosePhoto() {
        Ti.Media.openPhotoGallery({
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
            success: function(event) {
                Ti.API.info("Pick success");
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    var photo = Alloy.createModel("photo");
                    getLocation(function(err, place) {
                        photo.setImage(event.media, place);
                    });
                }
            },
            cancel: function() {},
            error: function(error) {
                alert(error);
            }
        });
    }
    function nextPage() {
        self.updating = true;
        photos.nextPage({
            success: function(newPhotos) {
                addPhotos(newPhotos);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    }
    function currentPage() {
        self.updating = true;
        photos.currentPage({
            success: function(newPhotos) {
                addPhotos(newPhotos);
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
    $.__views.uploadPhoto = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        color: "#000",
        text: "Click to upload!",
        id: "uploadPhoto"
    });
    $.__views.photoGallery.add($.__views.uploadPhoto);
    choosePhoto ? $.__views.uploadPhoto.addEventListener("click", choosePhoto) : __defers["$.__views.uploadPhoto!click!choosePhoto"] = true;
    $.__views.back = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        color: "#000",
        text: "Back to Home",
        id: "back"
    });
    $.__views.photoGallery.add($.__views.back);
    eliminate ? $.__views.back.addEventListener("click", eliminate) : __defers["$.__views.back!click!eliminate"] = true;
    $.__views.tableView = Ti.UI.createTableView({
        top: 30,
        id: "tableView"
    });
    $.__views.photoGallery.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var ServerUtil = require("serverUtil");
    var self = this;
    var args = arguments[0] || {};
    var parent = args.parent;
    var photos = Alloy.createCollection("photo");
    $.photoGallery.open();
    $.tableView.addEventListener("scrollEnd", function(e) {
        Ti.API.info(JSON.stringify(e.contentSize));
        Ti.API.info(JSON.stringify(e.size));
        Ti.API.info(JSON.stringify(e.contentOffset));
        !self.updating && e.contentOffset.y + e.size.height + 50 > e.contentSize.height && nextPage();
    });
    currentPage();
    self.closeWindow = closeWindow;
    self.openWindow = function() {
        $.photoGallery.open();
    };
    self.byPlace = function(placeID) {
        self.updating = true;
        photos.byPlaceID(placeID, {
            success: function(newPhotos) {
                changePhotos(newPhotos);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    };
    self.byUser = function(userID) {
        self.updating = true;
        photos.byUserID(userID, {
            success: function(newPhotos) {
                changePhotos(newPhotos);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    };
    __defers["$.__views.uploadPhoto!click!choosePhoto"] && $.__views.uploadPhoto.addEventListener("click", choosePhoto);
    __defers["$.__views.back!click!eliminate"] && $.__views.back.addEventListener("click", eliminate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;