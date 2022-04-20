new (function getAgentsNames() {
	this.act = async function (args, resolve, reject) {
	    let agent = await Ceed();
	    let agents = await agent.see('get', 'agents');
	    let names = Object.keys(agents);
	    
		resolve(names);
	};
})();