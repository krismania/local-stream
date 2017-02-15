function log(message) {
	// get the current time (in hh:mm:ss)
	var date = new Date();
	var time = {};

	time.hour = date.getHours();
	time.min = date.getMinutes();
	time.sec = date.getSeconds();

	// pad numbers < 10 with 0
	for (var num in time) {
		time[num] = (time[num] < 10 ? "0" : "") + time[num];
	}

	// format the output message
	var output = "[" + time.hour + ":" + time.min + ":" + time.sec + "] " + message;

	// print to console
	console.log(output);
}

module.exports = log;
