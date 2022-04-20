new (function connect() {
	this.act = async function (args, resolve, reject) {
		var agent = this.agent;
		if (!agent.socket) {
    		var socket = io();
    		agent.socket = socket;
    		socket.on('newAgent', function (name) {
    		  agent.see('getSocketAgent', name);
    		});
    		socket.on('question', function (data) {
    		  agent.see('onQuestion', data);
    		});
		    console.log(agent + " connected!")
		}
		else {
		    console.log(agent + " already connected!")
		}
		resolve();
	};
})();