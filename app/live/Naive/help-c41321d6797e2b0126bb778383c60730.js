new (function help() {
	this.act = async function (args, resolve, reject) {
		const agent = this.agent;
		const agents = {
		    'known': {},
		    'learnable': {}
		};
		{
    		const brain = agent.mind.getBrain();
    		const links = brain.reason();
  		
    		for (let i in links) {
    		    let link = links[i];
    		    let actions = agents['known'][link.a.info];
    		    if (!actions) {
    		        actions = [];
    		        agents['known'][link.a.info] = actions;
    		    }
    		    if (!actions.includes(link.r.info)) {
    		        actions.push(link.r.info);
    		    }
    		    
    		}
		}
		
		const brains = await agent.see('getLibraries');
		for (let brain of brains) {
    		const links = brain.reason();
    		
    		for (let i in links) {
    		    let link = links[i];
    		    let actions = agents['learnable'][link.a.info];
    		    if (!actions) {
    		        actions = [];
    		        agents['learnable'][link.a.info] = actions;
    		    }
    		    if (!actions.includes(link.r.info)) {
    		        actions.push(link.r.info);
    		    }
    		    
    		}
		}
		
		console.log('help', agents);
		resolve(agents);
	};
})();