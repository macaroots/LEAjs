new (function getSocketAgent() {
	this.act = function (name, resolve, reject) {
		const agent = this.agent;
		const socket = agent.socket;
		if (!agent.agents) {
			agent.agents = {};
		}
		let agents = agent.agents;
		let newAgent;
		try {
			newAgent = agents[name][0];
		} catch (e) {
			newAgent = new Promise((res, rej) => {
			    let socketAgent = new SocketAgent(name, socket);
    			agent.see('notify', ['newSocketAgent', socketAgent]);
			    res(socketAgent);
			});
			agents[name] = [newAgent];
		}
		newAgent.then(resolve);
	};
})();