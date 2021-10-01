new (function Http() {
	this.act = async function (args, callback) {
		let [req, res] = args;
console.log(this.agent + 'http', req.params);		
	    let agentName = req.params.agent || 'index';
	    let actionName = req.params.action || 'index';
		
		res.locals.agentName = agentName;
		res.locals.actionName = actionName;
		
		try {
            const agent = await Ceed(agentName + 'Controller Controller');
			//await agent.see('live');
			await agent.see('preDispatch', args);
			await agent.see(actionName, args);
			await agent.see('postDispatch', args);
		} catch(e) {
			console.log('ERRO HTTP', e);
		};
		
		callback(true); // return statement
	};
})();