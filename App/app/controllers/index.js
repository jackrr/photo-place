function doClick(e) {
	alert($.label.text);
}

function openUserPage(e) {
	Alloy.createController('user');
}

Alloy.createController('photoGallery');

// $.index.open();
