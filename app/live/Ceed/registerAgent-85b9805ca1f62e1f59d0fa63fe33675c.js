new (function registerAgent() {
	this.act = function (newAgent, resolve, reject) {
		const agent = this.agent;
		if (!agent.agents) {
			agent.agents = {};
		}
		let agents = agent.agents;
		newAgent.then(async function (a) {
			let names = (await a.see('getNames')).split(' ');
			// referência a partir do nome completo
			names.push(names.join(' '));
			for (let n of names) {
				if (!agents[n]) {
					agents[n] = [];
				}
				agents[n].unshift(newAgent);
			}
		});
		resolve();
	};
})();