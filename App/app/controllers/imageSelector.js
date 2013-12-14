var self = this;


var args = arguments[0] || {};
var parent = args.parent;
var photo = args.photo;
var thread = Alloy.createModel('Thread', {
	photoID: photo.id,
	userID: Ti.App.Properties.getObject('authInfo').id
});

var top = 0,
	left = 0,
	height = 0,
	width = 0;
	
var p1 = {
	x: 0,
	y: 0
};
var p2 = {
	x: 0,
	y: 0
};

$.image.image = photo.get('largePath');

self.imageSelector.open();

$.image.addEventListener('touchstart', function(e) {
	// e.x and e.y are coords
	left = e.x;
	top = e.y;
	p1.x = e.x;
	p1.y = e.y;
});

$.image.addEventListener('touchmove', function(e) {
	// e.x and e.y are coords
	p2.x = e.x;
	p2.y = e.y;

	if (p2.x < p1.x) {
		left = p2.x;
		width = p1.x - p2.x;
	} else {
		left = p1.x;
		width = p2.x - p1.x;
	}
	if (p2.y < p1.y) {
		top = p2.y;
		height = p1.y - p2.y;
	} else {
		top = p1.y;
		height = p2.y - p1.y;
	}
	
	// give visual feedback of rectangle
	$.overlayRegion.top = top;
	$.overlayRegion.left = left;
	$.overlayRegion.height = height;
	$.overlayRegion.width = width;
});

function cancel() {
	self.destroy();
	parent.openWindow();
}

function done() {
	var topCorner = {
		x: left,
		y: top
	};
	
	var bottomCorner = {
		x: left + width,
		y: top + height
	};

	self.destroy();
	thread.save({
		topCorner: topCorner,
		bottomCorner: bottomCorner,
		name: $.name.value
	}, {
		success: function(newThread) {
			self.destroy();
			parent.openWindow({update: true});
		},
		error: function() {
			alert('Failed to create thread');
		}
	});
}
