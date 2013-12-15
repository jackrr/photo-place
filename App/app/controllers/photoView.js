var dateUtil = require('dateUtil');
var graphicUtil = require('graphicUtil');
var self = this;

self.setPhoto = function(photo) {
	self.photo = photo;
	$.caption.text = "\"" + photo.get('caption') + "\"";
	$.userName.text = photo.get('userName');
	$.placeName.text = photo.get('placeName');
	$.uploadDate.text = dateUtil.prettyDate(photo.get('createdDate'));
	$.image.image = photo.get('mediumPath');
};

self.closeWindow = function() {
	$.photoView.close();
};

$.photoView.addEventListener('android:back', function() {
	back();
});

self.openWindow = function(options) {
	if (options && options.update) {
		loadThreads();
	}
	$.photoView.open();
};

function threadOverlay(tc, bc, id) {
	var overlay = graphicUtil.coloredRectView(tc, bc, .5);
	overlay.addEventListener('click', function() {
		fullPhoto();
	});
	return overlay;
}

function addPreview(threadPreview) {
	// create overlay on image
	$.imageMapContainer.add(threadOverlay(threadPreview.get('topCorner'), threadPreview.get('bottomCorner'), threadPreview.get('id')));
};

function loadThreads() {
	self.threadsCollection.forPhoto(self.photo.id, {
		success: function(newThreads) {
			Ti.API.info(JSON.stringify(newThreads));
			_.each(newThreads.models, function(threadPreview) {
				addPreview(threadPreview);
			});
		},
		error: function() {
			alert('Failed to get threads for photo');
		}
	});
};

function back() {
	self.closeWindow();
	self.destroy();
	parent.openWindow();
}

function fullPhoto() {
	var full = Alloy.createController('largeImage', {
		photo: self.photo,
		threads: self.threadsCollection,
		parent: self
	});
	self.closeWindow();
}

function openUser() {
	parent.byUser(self.photo.get('userID'));
	back();
}

function openPlace() {
	parent.byPlace(self.photo.get('placeID'));
	back();
}

function newThread() {
	var thread = Alloy.createController('imageSelector', {
		photo: self.photo,
		parent:self
	});
	self.closeWindow();
}


var args = arguments[0] || {};
var parent = args.parent;

self.setPhoto(args.photo);
self.threadsCollection = Alloy.createCollection('threadPreview');
loadThreads();
$.photoView.open();