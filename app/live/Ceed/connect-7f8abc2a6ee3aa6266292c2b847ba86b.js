new (function connect() {
	this.act = async function (args, resolve, reject) {
		var socket = io();
		var agent = this.agent;
		agent.socket = socket;
		socket.on('question', function (data) {
		  agent.see('onQuestion', data);
		});
		resolve();
	};
})();