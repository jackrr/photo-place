function Controller() {
    function changeGallery(options) {
        options ? options.placeID ? self.byPlace(options.placeID) : options.userID ? self.byUser(options.userID) : options.nearby ? self.nearby() : self.here() : self.openGlobal();
    }
    function globeButt() {
        changeGallery();
        setTab(0);
    }
    function nearButt() {
        changeGallery({
            nearby: true
        });
        setTab(1);
    }
    function setTab(tabnum, text) {
        $.removeClass(selected, "selected");
        if (0 === tabnum) selected = $.globalContainer; else if (1 == tabnum) selected = $.nearbyContainer; else if (2 == tabnum) {
            selected = $.hereContainer;
            text && ($.here.text = text);
        }
        $.addClass(selected, "selected");
    }
    function closeWindow() {
        $.photoGallery.close();
    }
    function eliminate() {
        closeWindow();
        self.destroy();
        parent.openWindow();
    }
    function addPhotos(newPhotos, placeLabels) {
        var rows = [];
        var lastPlace;
        _.each(newPhotos.models, function(photo) {
            if (placeLabels && photo.get("placeName") != lastPlace) {
                lastPlace = photo.get("placeName");
                var placeRow = Ti.UI.createTableViewRow({
                    title: lastPlace
                });
                rows.push(placeRow);
            }
            var row = Alloy.createController("galleryRow", {
                photo: photo,
                parent: self
            }).getView();
            rows.push(row);
        });
        $.tableView.appendRow(rows);
        self.updating = false;
    }
    function changePhotos(newPhotos, placeLabels) {
        var rows = [];
        var lastPlace;
        _.each(newPhotos.models, function(photo) {
            if (placeLabels && photo.get("placeName") != lastPlace) {
                lastPlace = photo.get("placeName");
                var placeRow = Ti.UI.createTableViewRow({
                    title: lastPlace
                });
                rows.push(placeRow);
            }
            var row = Alloy.createController("galleryRow", {
                photo: photo,
                parent: self
            }).getView();
            rows.push(row);
        });
        $.tableView.setData(rows);
        self.updating = false;
    }
    function choosePhoto() {
        Ti.Media.openPhotoGallery({
            mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
            success: function(event) {
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    var photo = Alloy.createModel("photo");
                    var place = Ti.App.Properties.getObject("currentPlace");
                    photo.setImage(event.media, place);
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
    function scrollLoadListener(on) {
        function loadMoreCheck(e) {
            Ti.API.info(JSON.stringify(e.contentSize));
            Ti.API.info(JSON.stringify(e.size));
            Ti.API.info(JSON.stringify(e.contentOffset));
            !self.updating && e.contentOffset.y + e.size.height + 50 > e.contentSize.height && nextPage();
        }
        on ? $.tableView.addEventListener("scrollEnd", loadMoreCheck) : $.tableView.removeEventListener("scrollEnd", loadMoreCheck);
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
    $.__views.uploadBar = Ti.UI.createView({
        height: 40,
        backgroundColor: "#33dd99",
        width: "100%",
        id: "uploadBar"
    });
    $.__views.photoGallery.add($.__views.uploadBar);
    $.__views.back = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 20,
        color: "#000",
        left: 5,
        text: "Back",
        id: "back"
    });
    $.__views.uploadBar.add($.__views.back);
    eliminate ? $.__views.back.addEventListener("click", eliminate) : __defers["$.__views.back!click!eliminate"] = true;
    $.__views.uploadPhoto = Ti.UI.createButton({
        right: 5,
        backgroundImage: "/images/camera-icon.png",
        id: "uploadPhoto"
    });
    $.__views.uploadBar.add($.__views.uploadPhoto);
    choosePhoto ? $.__views.uploadPhoto.addEventListener("click", choosePhoto) : __defers["$.__views.uploadPhoto!click!choosePhoto"] = true;
    $.__views.navigation = Ti.UI.createView({
        height: 60,
        width: "100%",
        id: "navigation"
    });
    $.__views.photoGallery.add($.__views.navigation);
    $.__views.globalContainer = Ti.UI.createView({
        width: "33.33%",
        backgroundColor: "#4433dd",
        color: "#ffffff",
        left: 0,
        id: "globalContainer"
    });
    $.__views.navigation.add($.__views.globalContainer);
    globeButt ? $.__views.globalContainer.addEventListener("click", globeButt) : __defers["$.__views.globalContainer!click!globeButt"] = true;
    $.__views.global = Ti.UI.createButton({
        backgroundImage: "/images/earth-icon.png",
        width: 50,
        height: 50,
        id: "global"
    });
    $.__views.globalContainer.add($.__views.global);
    $.__views.nearbyContainer = Ti.UI.createView({
        width: "33.33%",
        left: "33.33%",
        id: "nearbyContainer"
    });
    $.__views.navigation.add($.__views.nearbyContainer);
    nearButt ? $.__views.nearbyContainer.addEventListener("click", nearButt) : __defers["$.__views.nearbyContainer!click!nearButt"] = true;
    $.__views.nearby = Ti.UI.createButton({
        title: "Nearby",
        id: "nearby"
    });
    $.__views.nearbyContainer.add($.__views.nearby);
    $.__views.hereContainer = Ti.UI.createView({
        width: "33.33%",
        left: "66.66%",
        id: "hereContainer"
    });
    $.__views.navigation.add($.__views.hereContainer);
    $.__views.here = Ti.UI.createButton({
        title: "Here",
        id: "here"
    });
    $.__views.hereContainer.add($.__views.here);
    $.__views.tableView = Ti.UI.createTableView({
        top: 30,
        id: "tableView"
    });
    $.__views.photoGallery.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("serverUtil");
    require("locationUtil");
    var self = this;
    var args = arguments[0] || {};
    var parent = args.parent;
    var photos = Alloy.createCollection("photo");
    self.closeWindow = closeWindow;
    self.openWindow = function() {
        $.photoGallery.open();
    };
    self.here = function() {
        self.updating = true;
        photos.byPlace(Ti.App.Properties.getObject("curLocID"), {
            success: function(newPhotos) {
                changePhotos(newPhotos);
                scrollLoadListener(true);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    };
    self.nearby = function() {
        self.updating = true;
        photos.nearby({
            success: function(newPhotos) {
                changePhotos(newPhotos, true);
                scrollLoadListener(false);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    };
    self.openGlobal = function() {
        self.updating = true;
        photos.global({
            success: function(newPhotos) {
                changePhotos(newPhotos);
                scrollLoadListener(true);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    };
    self.byPlace = function(placeID) {
        self.updating = true;
        photos.byPlaceID(placeID, {
            success: function(newPhotos) {
                changePhotos(newPhotos);
                scrollLoadListener(true);
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
                scrollLoadListener(true);
            },
            error: function(e) {
                alert(JSON.stringify(e));
            }
        });
    };
    var selected = $.globalContainer;
    globeButt();
    $.photoGallery.open();
    __defers["$.__views.back!click!eliminate"] && $.__views.back.addEventListener("click", eliminate);
    __defers["$.__views.uploadPhoto!click!choosePhoto"] && $.__views.uploadPhoto.addEventListener("click", choosePhoto);
    __defers["$.__views.globalContainer!click!globeButt"] && $.__views.globalContainer.addEventListener("click", globeButt);
    __defers["$.__views.nearbyContainer!click!nearButt"] && $.__views.nearbyContainer.addEventListener("click", nearButt);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;