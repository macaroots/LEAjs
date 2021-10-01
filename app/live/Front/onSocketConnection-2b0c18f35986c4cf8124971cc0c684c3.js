new (function OnSocketConnection() {
	this.act = function(socket, callback) {
	    let session = socket.request.session;
		let lea = this.agent;
		
		socket.on('see', (agent, action, args, callback) => {
			lea.see('onSocketSee', [agent, action, args, socket]).then(callback);
		});
		
		//socket.join('/lea')
		let questions = this.agent.questions;
		for (let agent in questions) {
			for (let i in questions[agent]) {
				let key = questions[agent][i];
				socket.emit('question', [agent, key]);
			}
			
		}
		
		callback(true);
	};
})();