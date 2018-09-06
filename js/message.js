
var Message = (function() {
	var messages = ['You break camp and set out into the world...'];
	var window_id = 'message_log';

	return {
		add: function(mess) {this.messages.push(mess)},
		clear: function() {this.messages = [];}  /** TODO: Also, wipe the text in the UI element */
		get_all: function() {return this.messages},
		print: function(mess) {
			this.add(mess);
			console.log(mess);  /** TODO: This is where the UI interaction will have to happen */
		},
	}
})();
