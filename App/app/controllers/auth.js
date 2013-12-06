function closeWindow() {
	$.destroy();
	$.auth.close();
}

function openCreateAccount(e) {
	Alloy.createController('createAccount');
	closeWindow();
}

function openLogIn(e) {
	Alloy.createController('logIn');
	closeWindow();
}
