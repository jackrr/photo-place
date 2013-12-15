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

function myPlaceButt() {
	changeGallery({placeID: Ti.App.Properties.getObject('currentPlace').id});
	setTab(2);
}

function myPhotosButt() {
	changeGallery({userID: Ti.App.Properties.getObject('authInfo').id});
	setTab(3);
}

function resetColors(){
	var bgc = Alloy.CFG.lightYellow; 
	$.globalContainer.backgroundColor = bgc;
	$.nearbyContainer.backgroundColor = bgc;
	$.myPlaceContainer.backgroundColor = bgc;
	$.myPhotosContainer.backgroundColor = bgc;
}

function setTab(tabnum, text) {
	Ti.API.info(tabnum, JSON.stringify(self.currentTab));
	// $.removeClass(self.currentTab, 'selected');
	
	resetColors();
	if (tabnum === 0) {
		self.currentTab = $.globalContainer;
		//$.globalContainer.backgroundColor = Alloy.CFG.darkYellow;
	} else if (tabnum == 1) {
		self.currentTab = $.nearbyContainer;
		//$.nearbyContainer.backgroundColor = Alloy.CFG.darkYellow;
	} else if (tabnum == 2) {
		self.currentTab = $.myPlaceContainer;
		//$.myPlaceContainer.backgroundColor = Alloy.CFG.darkYellow;
		if (text) {
			$.myPlace.setText(text);
		}
	} else if (tabnum == 3) {
		self.currentTab = $.myPhotosContainer;
	} else {
	}
	
	self.currentTab.backgroundColor = Alloy.CFG.darkYellow;

	// $.addClass(self.currentTab, 'selected');

	var here = Ti.App.Properties.getObject('currentPlace');
	if (here && here.name) {
		$.placeName.setText(here.name);
		// $.myPlace.setText(here.name);
	}
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

function addPhotos(newPhotos, placeLabels) {
	var rows = [];
	var lastPlace;
	_.each(newPhotos.models, function(photo, index) {
		if (placeLabels && photo.get('placeName') != lastPlace) {
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
		if (placeLabels && photo.get('placeName') != lastPlace) {
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
	// Ti.Media.showCamera({
		// mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
//
		// success : function(event) {
			// if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				// self.closeWindow();
				// var place = Ti.App.Properties.getObject('currentPlace');
				// Alloy.createController('photoUpload', {parent: self, image: event.media, place: place});
			// }
		// },
		// cancel : function() {
//
		// },
		// error : function(error) {
			// alert(JSON.stringify(error));
		// }
	// });
	Ti.Media.openPhotoGallery({
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],

		success : function(event) {
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				self.closeWindow();
				var place = Ti.App.Properties.getObject('currentPlace');
				Alloy.createController('photoUpload', {parent: self, image: event.media, place: place});
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

function scrollLoadListener(on) {
	Ti.API.info(JSON.stringify(on));
	function loadMoreCheck(e) {
		Ti.API.info(JSON.stringify(e.contentSize));
		Ti.API.info(JSON.stringify(e.size));
		Ti.API.info(JSON.stringify(e.contentOffset));
		if (!self.updating && (e.contentOffset.y + e.size.height + 50 > e.contentSize.height)) {
			nextPage();
		}
	}

	if (on && !self.infiniScroll) {
		self.infiniScroll = true;
		Ti.API.info(JSON.stringify('Add listener'));
		$.tableView.addEventListener('scrollEnd', loadMoreCheck);
	} else if (!on && self.infiniScroll) {
		self.infiniScroll = undefined;
		Ti.API.info(JSON.stringify('Remove listener'));
		$.tableView.removeEventListener('scrollEnd', loadMoreCheck);
	}

}

self.currentTab = $.globalContainer;
globeButt();

$.photoGallery.open();


