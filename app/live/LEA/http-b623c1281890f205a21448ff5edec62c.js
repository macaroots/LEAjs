new (function Http() {
	this.act = async function (args, callback) {
		let [request, response] = args;
		
		let url = await import('url');
		let path = new url.URL(request.url, `http://${request.headers.host}`).pathname.split('/');
		let agentName = 'index';
		let actionName = 'index';
		switch (path.length) {
		    case 0:
		    case 1:
        		break;
		    default:
		    case 3:
		        actionName = path[2];
		    case 2:
		        agentName = path[1];
		}
		response.locals.agentName = agentName;
		response.locals.actionName = actionName;
		Ceed(agentName + 'Controller Controller').then(async agent => {
			try {
				//await agent.see('live');
				await agent.see('preDispatch', args);
				await agent.see(actionName, args);
				await agent.see('postDispatch', args);
			} catch(e) {
				console.log('ERRO HTTP', e);
			};
		});
		
		callback(true); // return statement
	};
})();