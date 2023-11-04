new (function getAgentsNames() {
	this.act = async function (args, resolve, reject) {
	    let ceed = await Ceed();
	    let agents = await ceed.see('get', 'agents');
	    
	    let names = [];
	    for (let name in agents) {
	        if (name == 'hits') {
	            continue;
	        }
	        for (let i in agents[name]) {
    	        let agent = await agents[name][i];
    	        let fullname = await agent.see('getFullName');
    	        if (!names.includes(fullname)) {
    	            names.push(fullname);
    	        }
	        }
	    }
	    
		resolve(names);
	};
})();