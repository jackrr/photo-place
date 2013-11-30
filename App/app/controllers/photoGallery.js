var photos = Alloy.createCollection('photo');

$.photoGallery.open();

function openPhotos(newPhotos) {
	var rows = [];
	_.each(newPhotos.models, function(photo, index) {
		var row = Alloy.createController('galleryPhoto', {photo: photo}).getView();
		rows.push(row);
	});
	
	$.tableView.setData(rows);	
}

function clickLabel() {
	photos.fetch({
		success: function() {
			openPhotos(photos);
		},
		error: function(e) {
			alert(JSON.stringify(e));
		}
	});
}
