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
		height : self.height,
		font : {
			fontSize : 10
		},
		backgroundColor : self.backgroundColor,
		textAlign : 'center',
		dataPosition : -1,
		verticalAlign : 'center'
	});
	var centerView = Ti.UI.createLabel({
		width : "40%",
		height : self.height,
		backgroundColor : self.focusColor,
		textAlign : 'center',
		verticalAlign : 'center'
	});
	var rightView = Ti.UI.createLabel({
		width : "30%",
		height : self.height,
		font : {
			fontSize : 10
		},
		backgroundColor : self.backgroundColor,
		textAlign : 'center',
		dataPosition : 1,
		verticalAlign : 'center'
	});

	self.add(leftView);
	self.add(centerView);
	self.add(rightView);

	centerView.text = self.data[0].text;
	rightView.text = self.data[rightView.dataPosition].text;

	rightView.addEventListener('click', function(e) {
		if (rightView.dataPosition < self.data.length) {
			leftView.text = centerView.text;
			centerView.text = rightView.text;

			leftView.dataPosition = leftView.dataPosition + 1;
			rightView.dataPosition = rightView.dataPosition + 1;

			if (rightView.dataPosition == self.data.length)
				rightView.text = '';
			else
				rightView.text = self.data[rightView.dataPosition].text;
		}
	});

	leftView.addEventListener('click', function(e) {
		if (leftView.dataPosition >= 0) {
			rightView.text = centerView.text;
			centerView.text = leftView.text;

			leftView.dataPosition = leftView.dataPosition - 1;
			rightView.dataPosition = rightView.dataPosition - 1;

			if (leftView.dataPosition < 0)
				leftView.text = '';
			else
				leftView.text = self.data[leftView.dataPosition].text;
		}
	});

	self.setData = function(newData) {
		Ti.API.info(JSON.stringify(newData));
		self.data = newData;
		Ti.API.info(JSON.stringify(self.data));

		leftView.text = '';
		
		if (newData.length >= 1){
			centerView.text = self.data[0].text;
			rightView.text = self.data[1] ? self.data[1].text : '';
		} else {
			centerView.text = 'no threads';
			rightView.text = '';
		}

		rightView.dataPosition = 1;
		leftView.dataPosition = -1;
	};

	return self;
}

module.exports = BetterPicker;
