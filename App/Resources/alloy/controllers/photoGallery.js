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
    function myPlaceButt() {
        changeGallery({
            placeID: Ti.App.Properties.getObject("currentPlace").id
        });
        setTab(2);
    }
    function myPhotosButt() {
        changeGallery({
            userID: Ti.App.Properties.getObject("authInfo").id
        });
        setTab(3);
    }
    function resetColors() {
        var bgc = Alloy.CFG.lightYellow;
        $.globalContainer.backgroundColor = bgc;
        $.nearbyContainer.backgroundColor = bgc;
        $.myPlaceContainer.backgroundColor = bgc;
        $.myPhotosContainer.backgroundColor = bgc;
    }
    function setTab(tabnum, text) {
        Ti.API.info(tabnum, JSON.stringify(self.currentTab));
        resetColors();
        if (0 === tabnum) self.currentTab = $.globalContainer; else if (1 == tabnum) self.currentTab = $.nearbyContainer; else if (2 == tabnum) {
            self.currentTab = $.myPlaceContainer;
            text && $.myPlace.setText(text);
        } else 3 == tabnum && (self.currentTab = $.myPhotosContainer);
        self.currentTab.backgroundColor = Alloy.CFG.darkYellow;
        var here = Ti.App.Properties.getObject("currentPlace");
        here && here.name && $.placeName.setText(here.name);
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
                    var place = Ti.App.Properties.getObject("currentPlace");
                    Alloy.createController("photoUpload", {
                        parent: self,
                        image: event.media,
                        place: place
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
    function scrollLoadListener(on) {
        function loadMoreCheck(e) {
            Ti.API.info(JSON.stringify(e.contentSize));
            Ti.API.info(JSON.stringify(e.size));
            Ti.API.info(JSON.stringify(e.contentOffset));
            !self.updating && e.contentOffset.y + e.size.height + 50 > e.contentSize.height && nextPage();
        }
        Ti.API.info(JSON.stringify(on));
        if (on && !self.infiniScroll) {
            self.infiniScroll = true;
            Ti.API.info(JSON.stringify("Add listener"));
            $.tableView.addEventListener("scrollEnd", loadMoreCheck);
        } else if (!on && self.infiniScroll) {
            self.infiniScroll = void 0;
            Ti.API.info(JSON.stringify("Remove listener"));
            $.tableView.removeEventListener("scrollEnd", loadMoreCheck);
        }
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
        backgroundColor: Alloy.CFG.cream,
        fullscreen: true,
        layout: "vertical",
        backgroundImage: "/images/homepage-background.png",
        id: "photoGallery"
    });
    $.__views.photoGallery && $.addTopLevelView($.__views.photoGallery);
    $.__views.uploadBar = Ti.UI.createView({
        height: 40,
        backgroundColor: Alloy.CFG.darkRed,
        width: "100%",
        id: "uploadBar"
    });
    $.__views.photoGallery.add($.__views.uploadBar);
    $.__views.back = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        left: 5,
        text: "Back",
        id: "back"
    });
    $.__views.uploadBar.add($.__views.back);
    eliminate ? $.__views.back.addEventListener("click", eliminate) : __defers["$.__views.back!click!eliminate"] = true;
    $.__views.placeName = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: 10,
        id: "placeName"
    });
    $.__views.uploadBar.add($.__views.placeName);
    $.__views.uploadPhoto = Ti.UI.createButton({
        right: 5,
        top: 5,
        height: 30,
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
        width: "25%",
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        backgroundColor: Alloy.CFG.lightYellow,
        color: "#ffffff",
        left: 0,
        backgrondColor: Alloy.CFG.darkYellow,
        id: "globalContainer"
    });
    $.__views.navigation.add($.__views.globalContainer);
    globeButt ? $.__views.globalContainer.addEventListener("click", globeButt) : __defers["$.__views.globalContainer!click!globeButt"] = true;
    $.__views.global = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: 45,
        height: 45,
        top: 8,
        backgroundImage: "/images/world-icon.png",
        id: "global"
    });
    $.__views.globalContainer.add($.__views.global);
    $.__views.nearbyContainer = Ti.UI.createView({
        width: "25%",
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        backgroundColor: Alloy.CFG.lightYellow,
        color: "#ffffff",
        left: "25%",
        id: "nearbyContainer"
    });
    $.__views.navigation.add($.__views.nearbyContainer);
    nearButt ? $.__views.nearbyContainer.addEventListener("click", nearButt) : __defers["$.__views.nearbyContainer!click!nearButt"] = true;
    $.__views.nearby = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: 45,
        height: 45,
        top: 8,
        backgroundImage: "/images/nearby.png",
        id: "nearby"
    });
    $.__views.nearbyContainer.add($.__views.nearby);
    $.__views.myPlaceContainer = Ti.UI.createView({
        width: "25%",
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        backgroundColor: Alloy.CFG.lightYellow,
        color: "#ffffff",
        left: "50%",
        id: "myPlaceContainer"
    });
    $.__views.navigation.add($.__views.myPlaceContainer);
    myPlaceButt ? $.__views.myPlaceContainer.addEventListener("click", myPlaceButt) : __defers["$.__views.myPlaceContainer!click!myPlaceButt"] = true;
    $.__views.myPlace = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: 45,
        height: 45,
        top: 8,
        backgroundImage: "/images/current-location.png",
        id: "myPlace"
    });
    $.__views.myPlaceContainer.add($.__views.myPlace);
    $.__views.myPhotosContainer = Ti.UI.createView({
        width: "25%",
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        backgroundColor: Alloy.CFG.lightYellow,
        color: "#ffffff",
        left: "75%",
        id: "myPhotosContainer"
    });
    $.__views.navigation.add($.__views.myPhotosContainer);
    myPhotosButt ? $.__views.myPhotosContainer.addEventListener("click", myPhotosButt) : __defers["$.__views.myPhotosContainer!click!myPhotosButt"] = true;
    $.__views.myPhotos = Ti.UI.createLabel({
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "#000",
        width: 45,
        height: 45,
        top: 8,
        backgroundImage: "/images/my-photos.png",
        id: "myPhotos"
    });
    $.__views.myPhotosContainer.add($.__views.myPhotos);
    $.__views.tableView = Ti.UI.createTableView({
        top: 0,
        backgroundColor: "transparent",
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
                scrollLoadListener();
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
    self.currentTab = $.globalContainer;
    globeButt();
    $.photoGallery.open();
    __defers["$.__views.back!click!eliminate"] && $.__views.back.addEventListener("click", eliminate);
    __defers["$.__views.uploadPhoto!click!choosePhoto"] && $.__views.uploadPhoto.addEventListener("click", choosePhoto);
    __defers["$.__views.globalContainer!click!globeButt"] && $.__views.globalContainer.addEventListener("click", globeButt);
    __defers["$.__views.nearbyContainer!click!nearButt"] && $.__views.nearbyContainer.addEventListener("click", nearButt);
    __defers["$.__views.myPlaceContainer!click!myPlaceButt"] && $.__views.myPlaceContainer.addEventListener("click", myPlaceButt);
    __defers["$.__views.myPhotosContainer!click!myPhotosButt"] && $.__views.myPhotosContainer.addEventListener("click", myPhotosButt);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;