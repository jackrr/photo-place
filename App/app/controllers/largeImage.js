var dateUtil = require('dateUtil');
var graphicUtil = require('graphicUtil');
var self = this;


/*
 * Arguments
 */
var args = arguments[0] || {};
var parent = args.parent;
var photo = args.photo;
var threadsCollection = args.threads;

/*
 * functions
 */
function nameClick() {
	Ti.API.info('clicked ' + self.currentThreadID);
		// Alloy.createController('threadView', {
			// threadID: overlay.value,
			// photo: self.photo,
			// parent: self 
		// });
		// self.closeWindow();	
}

function changeThreadName(threadPreview) {
	Ti.API.info('in change name: ' + threadPreview.get('name'));
	if (!self.currentThreadID) {
		$.threadName.addEventListener('click', nameClick);	
	}
	$.threadName.text = threadPreview.get('name');
	self.currentThreadID = threadPreview.id;
}

function threadOverlay(threadPreview) {
	var overlay = graphicUtil.coloredRectView(threadPreview.get('topCorner'), threadPreview.get('bottomCorner'), 1);
	var preview = threadPreview;
	overlay.addEventListener('click', function() {
		Ti.API.info('clicked: ' + threadPreview.get('name'));
		changeThreadName(preview);
	});
	return overlay;
}

function addPreview(threadPreview) {
	// create overlay on image
	$.imageMapContainer.add(threadOverlay(threadPreview));
};

function loadThreads() {
	_.each(threadsCollection.models, function(threadPreview) {
		addPreview(threadPreview);
	});
};

function refreshThreads() {
	threadsCollection.forPhoto(photo.id, {
		success: function(newThreads) {
			loadThreads();
		},
		error: function() {
			alert('Failed to get threads for photo');
		}
	});
}

function newThread() {
	var thread = Alloy.createController('imageSelector', {
		photo: photo,
		parent:self
	});
	self.closeWindow();
}

self.closeWindow = function() {
	$.largeImage.close();
};

self.openWindow = function(options) {
	if (options.update) {
		refreshThreads();
	}
	$.largeImage.open();
};

function back() {
	$.largeImage.close();
	self.destroy();
	parent.openWindow();
}

$.largeImage.addEventListener('android:back', function() {
	back();
});

/*
 * initialize
 */
$.image.image = photo.get('largePath');
$.caption.text = "\"" + photo.get('caption') + "\"";
loadThreads();
$.largeImage.open();