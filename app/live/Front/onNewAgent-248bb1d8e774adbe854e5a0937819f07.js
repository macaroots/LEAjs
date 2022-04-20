new (function onNewAgent() {
	this.act = async function (agent, resolve, reject) {
	    let front = this.agent;
	    let name = await agent.see('getName');
	    console.log('NEW AGENT', name);
		let io = await front.see('get', 'ioServer');
		if (io) {
			io.emit('newAgent', name);
		}
		resolve();
	};
})();