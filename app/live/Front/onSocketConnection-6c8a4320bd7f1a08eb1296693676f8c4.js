new (function OnSocketConnection() {
	this.act = async function(socket, resolve, reject) {
	    let session = socket.request.session;
		let lea = this.agent;
	    let user = session.user;
	    // Descomentar para autorizar por chave SSL
	    //let authorized = socket.request.client.authorized;
	    /**/
	    if (!user) {
	        console.log('Socket connection not authorized!', socket.id);
	        socket.disconnect();
	        return resolve(false);
	    }
	    /**/
	    
		console.log('Socket connected:', socket.id, session, user);
		
		socket.on('see', (agent, action, args, callback) => {
			lea.see('onSocketSee', [agent, action, args, socket]).then(callback);
		});
		
		
		for (let name of await lea.see('getAgentsNames')) {
		    if (name.toLowerCase().indexOf(user.toLowerCase() + '/') == 0) {
    			socket.emit('newAgent', name);
		    }
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