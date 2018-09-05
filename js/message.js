
var Message = (function() {
	var messages = ['You break camp and set out into the world...'];
	var window_id = '0';

	return {
		add: function(mess) {this.messages.push(mess)},
		get_all: function() {return this.messages},
		print: function(mess) {
			this.add(mess);
			console.log(mess);
		},
	}
})();
