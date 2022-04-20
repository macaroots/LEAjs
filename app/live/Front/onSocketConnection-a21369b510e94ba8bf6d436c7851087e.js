new (function OnSocketConnection() {
	this.act = async function(socket, resolve, reject) {
	    let authorized = socket.request.client.authorized;
	    // Descomentar para autorizar por chave SSL
	    /*/
	    if (!authorized) {
	        console.log('Socket connection not authorized!', socket.id);
	        socket.disconnect();
	        return resolve(false);
	    }
	    /**/
	    
	    let session = socket.request.session;
		let lea = this.agent;
		console.log('Socket connected:', socket.id, session, authorized);
		
		socket.on('see', (agent, action, args, callback) => {
			lea.see('onSocketSee', [agent, action, args, socket]).then(callback);
		});
		
		
		for (let name of await lea.see('getAgentsNames')) {
			socket.emit('newAgent', name);
		}
		
		//socket.join('/lea')
		// Envia as perguntas passadas
		/*/
		let questions = this.agent.questions;
		for (let agent in questions) {
			for (let i in questions[agent]) {
				let key = questions[agent][i];
				socket.emit('question', [agent, key]);
			}
			
		}
		/**/
		
		resolve(true);
	};
})();