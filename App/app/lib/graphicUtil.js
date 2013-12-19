var randomColor = function() {
	return '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
};

exports.randomColor = randomColor;

function ColorLuminance(hex, lum) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

exports.darkenColor = function(hex, percent){
	return (percent < 0 ? ColorLuminance(hex,percent) : ColorLuminance(hex,(percent*-1)));
};

exports.lightenColor = function(hex, percent){
	return (percent > 0 ? ColorLuminance(hex,parent) : ColorLuminance(hex,(percent*-1)));
};

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
