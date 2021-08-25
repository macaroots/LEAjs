new (function live() {
	this.act = async function (args, resolve, reject) {
	    /*let MySQLBrain = (await import('./mysql_brain.js')).MySQLBrain;
	    let options = Object.assign({
			database: 'xanadu'
		}, args);
		agent.library = new MySQLBrain(options);*/
		let agent = this.agent;
		console.log(agent + '- BrainController.live');
		agent.library = (await agent.see('getLibraries'))[0];
		await Promise.all([
    		agent.see('study', 'preDispatch'),
    		agent.see('study', 'reason'),
    		agent.see('study', 'tie'),
    		agent.see('study', 'gets'),
    		agent.see('study', 'getLinkFromRequest'),
    		agent.see('study', 'getSymbolFromRequest'),
    		agent.see('study', 'GET_getSymbolFromRequest'),
    		agent.see('study', 'POST_getSymbolFromRequest')
    	]);
		resolve(true);
	};
})();