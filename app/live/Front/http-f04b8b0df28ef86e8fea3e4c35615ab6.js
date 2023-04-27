new (function Http() {
	this.act = async function (args, callback) {
		let [req, res] = args;
	    let agentName = req.params.agent || 'index';
	    let actionName = req.params.action || 'index';
		if (agentName != 'brain' && actionName != 'reason') {
            console.log(new Date(), this.agent + ' - http', req.params);
		}
		try {
		    agentName = req.vhost[0] + '/' + agentName.charAt(0).toUpperCase() + agentName.slice(1) + '/Controller ' + agentName;
		} catch {}
		res.locals.agentName = agentName;
		res.locals.actionName = actionName;
		
		try {
            const agent = await Ceed(agentName + '/Controller Controller');
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