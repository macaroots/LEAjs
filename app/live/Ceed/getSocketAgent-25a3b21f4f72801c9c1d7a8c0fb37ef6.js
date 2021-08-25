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
		    name = name.charAt(0).toUpperCase() + name.slice(1);
			newAgent = agents[name][0];
		} catch (e) {
			newAgent = new Promise((res, rej) => {
			    let socketAgent = new SocketAgent(name, socket);
    			agent.see('notify', ['newAgent', socketAgent]);
			    res(socketAgent);
			});
			agents[name] = [newAgent];
			agent.see('registerAgent', newAgent);
		}
		newAgent.then(resolve);
	};
})();