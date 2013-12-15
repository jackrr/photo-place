var randomColor = function() {
	return '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
};

exports.randomColor = randomColor;

exports.coloredRectView = function(tc, bc, scale) {
	return Ti.UI.createView({
		backgroundColor: randomColor(),
		opacity: '0.3',
		zIndex: 1,
		top: tc.y * scale,
		left: tc.x * scale,
		height: (bc.y - tc.y) * scale,
		width: (bc.x - tc.x) * scale
	});
};
