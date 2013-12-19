function ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    6 > hex.length && (hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]);
    lum = lum || 0;
    var c, i, rgb = "#";
    for (i = 0; 3 > i; i++) {
        c = parseInt(hex.substr(2 * i, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}

var randomColor = function() {
    return "#" + ("000000" + Math.floor(16777215 * Math.random()).toString(16)).slice(-6);
};

exports.randomColor = randomColor;

exports.darkenColor = function(hex, percent) {
    return 0 > percent ? ColorLuminance(hex, percent) : ColorLuminance(hex, -1 * percent);
};

exports.lightenColor = function(hex, percent) {
    return percent > 0 ? ColorLuminance(hex, parent) : ColorLuminance(hex, -1 * percent);
};

exports.coloredRectView = function(tc, bc, scale) {
    return Ti.UI.createView({
        backgroundColor: randomColor(),
        opacity: "0.3",
        zIndex: 1,
        top: tc.y * scale,
        left: tc.x * scale,
        height: (bc.y - tc.y) * scale,
        width: (bc.x - tc.x) * scale
    });
};