function BetterPicker(args) {
	var params = {
		height : args.height || Ti.UI.SIZE,
		width : args.width || Ti.UI.SIZE,
		top : args.top || 0,
		bottom : args.bottom || 0,
		left : args.left || 0,
		right : args.right || 0,
		data : args.data || {},
		layout : 'horizontal',
		focusColor : args.focusColor || Alloy.CFG.darkYellow,
		backgroundColor : args.backgroundColor || Alloy.CFG.lightYellow
	};

	var self = Ti.UI.createView(params);

	var leftView = Ti.UI.createLabel({
		width : "30%",
		height : 'auto',
		font : {
			fontSize : 26
		},
		text : "+",
		backgroundColor : self.backgroundColor,
		textAlign : 'center'
	});
	var centerView = Ti.UI.createLabel({
		width : "40%",
		height : 'auto',
		backgroundColor : self.focusColor,
		textAlign : 'center'
	});
	var rightView = Ti.UI.createLabel({
		width : "30%",
		height : 'auto',
		font : {
			fontSize : 10
		},
		backgroundColor : self.backgroundColor,
		textAlign : 'center'
	});
	
	

	self.add(leftView);
	self.add(centerView);
	self.add(rightView);
	
	centerView.text = self.data[0];
	rightView.text = self.data[1];

	self.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {

		} else if (e.direction == 'right') {

		}
	});

	return self;
}

module.exports = BetterPicker; 