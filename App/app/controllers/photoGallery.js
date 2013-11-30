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

function choosePhoto() {
	Ti.Media.openPhotoGallery({
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
		
		success: function(event) {
			Ti.API.info('Pick success');
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var photo = Alloy.createModel('photo');
				photo.setImage(event.media);
			}
		},
		cancel: function() {
			
		},
		error: function(error) {
			alert(error);
		}
	});
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
