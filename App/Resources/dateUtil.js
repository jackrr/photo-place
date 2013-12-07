function getHourAndMinutes(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    minutes = 10 > minutes ? ":0" + minutes : ":" + minutes;
    if (hour > 12) return "" + (hour - 12) + minutes + " PM";
    if (0 === hour) return "12" + minutes + " AM";
    if (12 === hour) return "12" + minutes + " PM";
    return "" + hour + minutes + " AM";
}

function getMonth(date) {
    return months[date.getMonth()];
}

function getDay(date) {
    return days[date.getDay()];
}

function getAge(date) {
    var age = new Date(Date.now() - date);
    if (oneDay > age) return "today";
    if (7 * oneDay > age) return "this week";
    if (new Date().getFullYear() == date.getFullYear()) return "this year";
    return "nope";
}

function getReadableDate(date) {
    date = new Date(date);
    var age = getAge(date);
    return "today" == age ? getHourAndMinutes(date) : "this week" == age ? getDay(date) + " " + getHourAndMinutes(date) : "this year" == age ? getMonth(date) + " " + date.getDate() + " " + getHourAndMinutes(date) : getMonth(date) + " " + date.getDate() + " " + date.getFullYear();
}

var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

var oneDay = 864e5;

module.exports = {
    prettyDate: getReadableDate
};