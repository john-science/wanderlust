
var Message = (function() {
	var messages = ['You walk into Sequoia National Forest...'];
	var window_id = "message_log";
	var wind = document.getElementById(window_id);

	return {
		init: function() {
			wind = document.getElementById(window_id);
			wind.value = messages[0];
		},
		add: function(mess) {messages.push(mess);},
		clear: function() {
			messages = [];
			wind.value = "";
		},
		get_all: function() {return messages;},
		print: function(mess) {
			this.add(mess);
            wind.value += "\n" + mess;
            wind.scrollTop = wind.scrollHeight;
		},
	}
})();
