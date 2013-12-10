var ServerUtil = require('serverUtil');
var LocationUtil = require('locationUtil');

var self = this;
var args = arguments[0] || {};
var parent = args.parent;
var photos = Alloy.createCollection('photo');


function changeGallery(options) {
	if (options) {
		if (options.placeID) {
			self.byPlace(options.placeID);
		} else if (options.userID) {
			self.byUser(options.userID);
		} else if (options.nearby) {
			self.nearby();
		} else {
			self.here();
		}
	} else {
		self.openGlobal();
	}
}

function globeButt() {
	changeGallery();
	setTab(0);
}

function nearButt() {
	changeGallery({nearby: true});
	setTab(1);
}

function setTab(tabnum, text) {
	$.removeClass(selected, 'selected');
	if (tabnum === 0) {
		selected = $.globalContainer;
	} else if (tabnum == 1) {
		selected = $.nearbyContainer;
	} else if (tabnum == 2) {
		selected = $.hereContainer;
		if (text) {
			$.here.text = text;			
		}
	}
	$.addClass(selected, 'selected');
}

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

self.here = function() {
	self.updating = true;
	photos.byPlace(Ti.App.Properties.getObject('curLocID'), {
		success: function(newPhotos) {
			changePhotos(newPhotos);
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

function addPhotos(newPhotos, placeLabels) {
	var rows = [];
	var lastPlace;
	_.each(newPhotos.models, function(photo, index) {
		if (placeLabels && photo.get('placeName') != lastPlace.name) {
			lastPlace = photo.get('placeName');
			var placeRow = Ti.UI.createTableViewRow({
				title: lastPlace
			});
			rows.push(placeRow);
		}
		var row = Alloy.createController('galleryRow', {
			photo : photo,
			parent : self
		}).getView();
		rows.push(row);
	});

	$.tableView.appendRow(rows);
	self.updating = false;
}

function changePhotos(newPhotos, placeLabels) {
	var rows = [];
	var lastPlace;
	_.each(newPhotos.models, function(photo, index) {
		if (placeLabels && photo.get('placeName') != lastPlace.name) {
			lastPlace = photo.get('placeName');
			var placeRow = Ti.UI.createTableViewRow({
				title: lastPlace
			});
			rows.push(placeRow);
		}
		var row = Alloy.createController('galleryRow', {
			photo : photo,
			parent : self
		}).getView();
		rows.push(row);
	});

	$.tableView.setData(rows);
	self.updating = false;
}

function choosePhoto() {
	Ti.Media.openPhotoGallery({
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],

		success : function(event) {
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var photo = Alloy.createModel('photo');
				var place = Ti.App.Properties.getObject('currentPlace');
				photo.setImage(event.media, place);	
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
			changePhotos(newPhotos);
		},
		error : function(e) {
			alert(JSON.stringify(e));
		}
	});
}

var selected = $.globalContainer;
globeButt();

$.photoGallery.open();

$.tableView.addEventListener('scrollEnd', function(e) {
	Ti.API.info(JSON.stringify(e.contentSize));
	Ti.API.info(JSON.stringify(e.size));
	Ti.API.info(JSON.stringify(e.contentOffset));
	if (!self.updating && (e.contentOffset.y + e.size.height + 50 > e.contentSize.height)) {
		nextPage();
	}
});
