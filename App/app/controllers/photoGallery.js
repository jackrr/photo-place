var ServerUtil = require('serverUtil');

var self = this;
var args = arguments[0] || {};
var parent = args.parent;
var photos = Alloy.createCollection('photo');

$.photoGallery.open();

$.tableView.addEventListener('scrollEnd', function(e) {
	Ti.API.info(JSON.stringify(e.contentSize));
	Ti.API.info(JSON.stringify(e.size));
	Ti.API.info(JSON.stringify(e.contentOffset));
	if (!self.updating && (e.contentOffset.y + e.size.height + 50 > e.contentSize.height)) {
		nextPage();
	}
});

currentPage();

function closeWindow() {
	$.photoGallery.close();
}

function eliminate() {
	closeWindow();
	self.destroy();
	parent.openWindow();
};

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

function addPhotos(newPhotos) {
	var rows = [];
	_.each(newPhotos.models, function(photo, index) {
		var row = Alloy.createController('galleryRow', {
			photo : photo,
			parent : self
		}).getView();
		rows.push(row);
	});

	$.tableView.appendRow(rows);
	self.updating = false;
}

function changePhotos(newPhotos) {
	var rows = [];
	_.each(newPhotos.models, function(photo, index) {
		var row = Alloy.createController('galleryRow', {
			photo : photo,
			parent : self
		}).getView();
		rows.push(row);
	});

	$.tableView.setData(rows);
	self.updating = false;
}

function getLocation(cb) {
	ServerUtil.getNearbyPlaces(function(err, places) {
		if (err) return cb(err);
		// present a prompt for user to select the correct place
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
		var picker = Alloy.createController('picker');
		picker.setCallback(function(selectedRow) {
			cb(null, placeHash[selectedRow.value]);
		});
		picker.setRows(rows);
		picker.getView().open();
	});
}

function choosePhoto() {
	Ti.Media.openPhotoGallery({
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],

		success : function(event) {
			Ti.API.info('Pick success');
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var photo = Alloy.createModel('photo');
				getLocation(function(err, place) {
					photo.setImage(event.media, place);	
				});
			}
		},
		cancel : function() {

		},
		error : function(error) {
			alert(error);
		}
	});
}

function nextPage() {
	self.updating = true;
	photos.nextPage({
		success : function(newPhotos) {
			addPhotos(newPhotos);
		},
		error : function(e) {
			alert(JSON.stringify(e));
		}
	});
}

// function previousPage() {
	// photos.previousPage({
		// success : function(newPhotos) {
			// openPhotos(newPhotos);
		// },
		// error : function(e) {
			// alert(JSON.stringify(e));
		// }
	// });
// }


function currentPage() {
	self.updating = true;
	photos.currentPage({
		success : function(newPhotos) {
			addPhotos(newPhotos);
		},
		error : function(e) {
			alert(JSON.stringify(e));
		}
	});
}
