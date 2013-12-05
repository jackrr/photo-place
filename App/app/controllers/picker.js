var self = this;
var callback;

self.setRows = function(rows) {
	$.thePicker.add(rows);
};

self.setCallback = function(cb) {
	callback = cb;
};

function done() {
	callback($.thePicker.getSelectedRow(0));		
}
