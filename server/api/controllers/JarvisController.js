/**
 * HiBotController
 *
 * @description :: Server-side logic for chatbot
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 

module.exports = {
    chat: function (req, res) {
    	if (!req.isSocket) {
			return res.badRequest();
		}

		// Get socket id of new comming message
		var senderId = sails.sockets.getId(req);
		var roomName = sails.sockets.getId(req);

		if (!_.isUndefined(req.param('requestARoom'))) {
			sails.sockets.join(senderId, roomName);
		}

		if (!_.isUndefined(req.param('message'))) {
			Jarvis.getReply(req.param('message'), senderId, roomName);
		} else {
			Jarvis.help(senderId, roomName);
		}
       

    }
};