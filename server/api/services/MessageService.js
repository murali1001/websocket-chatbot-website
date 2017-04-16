// Promise for sending messages
var messageSendPromise = new Promise(function(resolve, reject){
	resolve();
});

module.exports = {
	sendMessage: function(message, senderId, roomName) {
		messageSendPromise.then(function() {
			sails.sockets.broadcast(roomName, 'newmessage', {reply: message}, senderId);
		});
	}
}