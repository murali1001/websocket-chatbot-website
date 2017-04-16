var request = require('request');
const conversationDB = {};

var RiveScript = require('rivescript');

// Make a new bot with UTF-8 mode enabled.
var JarvisBot = new RiveScript({utf8: true});

// Load a directory full of RiveScript documents (.rive files). This is for
// Node.JS only: it doesn't work on the web!
JarvisBot.loadDirectory("vbrain", brain_loading_done, brain_loading_error);

function brain_loading_done() {
	JarvisBot.sortReplies();
	console.log('vBrain is loaded!');
}
function brain_loading_error (error) {
	console.log("Error when loading files: " + error);
}

// Promise for processing messages
var messageProcessPromise = new Promise(function(resolve, reject){
	resolve();
});

function getReplyQueue(message, senderId, roomName) {
	messageProcessPromise.then(function() {
		console.log('ID: ' + senderId + '\n-- message: ' + message);
		message = message.replace(/tao|mình|tớ|\st\s/gi, "tôi");
		message = message.replace(/cậu|mày|bot|\sm\s/gi, "bạn");
		message = Vietnamese.removeSign(message);
		var reply = JarvisBot.reply(senderId, message);

		if (reply.includes('undefined')) { // trick if rivescript cannot find a suitable answer
			reply = 'Có vẻ tôi chưa có thông tin về điều này.';
		}
		
		MessageService.sendMessage(reply, senderId, roomName);
		console.log('ID: ' + senderId + '\n--> reply: ' + reply);
	})
}


function help(senderId, roomName) {
	MessageService.sendMessage('Xin chào! Tôi là chatbot của page này.', senderId, roomName);
	MessageService.sendMessage('Tôi có thể trò chuyện cùng bạn và cung cấp một số dịch vụ web.', senderId, roomName);
	MessageService.sendMessage('+ Nhận trợ giúp bằng cách gõ "help"', senderId, roomName);
}



module.exports = {
	getReply: function(message, senderId, roomName) {
		stdMessage = Vietnamese.standardize(message);
		if (stdMessage.indexOf('help') === 0) {
			this.help(senderId, roomName);
		} else if (stdMessage.indexOf('Hiên') === 0) { // for my love
			MessageService.sendMessage('Hiên là người yêu của Việt Anh nhé :D', senderId, roomName);
		} else if (stdMessage.indexOf('tkn') === 0) {
			MessageService.sendMessage('Xin lỗi! tính năng tra tên Katakana đã bị loại bỏ.', senderId, roomName);
		} else {
			getReplyQueue(message, senderId, roomName);
		}
	}, help: function(senderId, roomName) {
		MessageService.sendMessage('Xin chào! Tôi là chatbot của page này.', senderId, roomName);
		MessageService.sendMessage('Tôi có thể trò chuyện cùng bạn và cung cấp một số dịch vụ web.', senderId, roomName);
		MessageService.sendMessage('+ Nhận trợ giúp bằng cách gõ "help"', senderId, roomName);
	}

}



// function getReplyContain(message,s) {
// 	for (var i = 0; i < conversationDB.length; i++) {
// 		var strToSearch = message.toLowerCase();
// 		var containBool = false;
// 		for (var j = 0; j < conversationDB[i][0].length; j++) {
// 			if (strToSearch.includes(conversationDB[i][0][j])) {
// 				containBool = true;
// 				break;
// 			}
// 		}
// 		if (containBool) {
// 			let totalAmount = conversationDB[i][1].length;
// 			let rand = Math.floor(Math.random() * totalAmount);
// 			conversationDB[i][1][rand];
// 			return true;
// 		}
// 	}
// 	return false;
// }


// function getReplySimsimi(message, callback) { 
// 	request(
// 		{
// 			url: 'http://trunghi-tienich.rhcloud.com/api.php',
// 			qs: {text: message}
// 		},
// 		function(err, res, body){
// 	    if(err) {
// 	        console.log('error: ' + err);
// 	        console.log('res: ' + res);
// 	        console.log('body: ' + body);
// 	    } else {
// 	    	callback(body);
// 	    }
// 	});
// }