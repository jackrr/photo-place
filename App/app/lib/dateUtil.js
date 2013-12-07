var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var oneDay = 24*60*60*1000;

function getHourAndMinutes(date) {
	var hour = date.getHours();
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = ':0' + minutes;
	} else {
		minutes = ':' + minutes;
	}
	if (hour > 12) {
		return '' + (hour - 12) + minutes + ' PM';
	} else if (hour === 0) {
		return '12' + minutes + ' AM';
	} else if (hour === 12) {
		return '12' + minutes + ' PM';
	}
	return '' + hour + minutes + ' AM';
}

function getMonth(date) {
	return months[date.getMonth()];
}

function getDay(date) {
	return days[date.getDay()];
}

function getAge(date) {
	var age = new Date(Date.now() - date);
	
	if (age < oneDay) {
		return 'today';
	}
	if (age < 7*oneDay) {
		return 'this week';
	}
	if (new Date().getFullYear() == date.getFullYear()) {
		return 'this year';
	}
	return 'nope';
}

function getReadableDate(date) {
	date = new Date(date);
	var age = getAge(date);
	if (age == 'today') { // within last 24 hours
		// 7:24 PM
		return getHourAndMinutes(date);
	} else if (age == 'this week') { // within last week
		// Monday 7:34 AM
		return getDay(date) + ' ' + getHourAndMinutes(date); 
	} else if (age == 'this year'){ // this year
		// September 8 at 4:20 PM
		return getMonth(date) + ' ' + date.getDate() + ' ' + getHourAndMinutes(date);
	} else { // last year or older
		// September 8 2012
		return getMonth(date) + ' ' + date.getDate() + ' ' + date.getFullYear();
	}
}

module.exports = {
		prettyDate: getReadableDate
};