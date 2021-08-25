new (function checkPermission() {
	this.act = function (args, resolve, reject) {
	    let [request, response] = args;
	    
	    let agentName = response.locals.agentName;
	    let actionName = response.locals.actionName;
		let prohibited = ['hear', 'write', 'tie', 'set'];
		let allow = false;
		
		if (!prohibited.includes(actionName)) {
		    allow = true;
		}
		else {
		    if (request.session.user) {
		        allow = true;
		    }
		}
		resolve(allow);
	};
})();