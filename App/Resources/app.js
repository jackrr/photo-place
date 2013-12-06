var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

if (Alloy.CFG.geolocPurpose) {
    Ti.API.info("setting geoloc");
    Ti.Geolocation.setPurpose(Alloy.CFG.geolocPurpose);
}

Ti.Geolocation.setAccuracy(Ti.Geolocation.ACCURACY_BEST);

Ti.Geolocation.getCurrentPosition(function() {});

Alloy.createController("index");