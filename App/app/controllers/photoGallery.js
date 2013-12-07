var ServerUtil = require('serverUtil');

var photos = Alloy.createCollection('photo');

$.photoGallery.open();

currentPage();

function closeWindow() {
	$.photoGallery.close();
}

function openPhotos(newPhotos) {
	var rows = [];
	_.each(newPhotos.models, function(photo, index) {
		var row = Alloy.createController('galleryRow', {
			photo : photo
		}).getView();
		rows.push(row);
	});

	$.tableView.setData(rows);
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
	photos.nextPage({
		success : function(newPhotos) {
			openPhotos(newPhotos);
		},
		error : function(e) {
			alert(JSON.stringify(e));
		}
	});
}

function previousPage() {
	photos.previousPage({
		success : function(newPhotos) {
			openPhotos(newPhotos);
		},
		error : function(e) {
			alert(JSON.stringify(e));
		}
	});
}


function currentPage() {
	photos.currentPage({
		success : function(newPhotos) {
			openPhotos(newPhotos);
		},
		error : function(e) {
			alert(JSON.stringify(e));
		}
	});
}
