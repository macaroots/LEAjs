new (function checkPermission() {
	this.act = function (args, resolve, reject) {
	    let [request, response] = args;
	    
	    let agentName = response.locals.agentName;
	    let actionName = response.locals.actionName;
		let prohibited = ['hear', 'write', 'tie', 'set', 'sets'];
		let allow = false;
console.log('Checking Permission: ', response.locals, request.session.user);		
		if (!prohibited.includes(actionName)) {
		    allow = true;
		}
		else {
		    if (request.session.user) {
		        allow = true;
		    }
		    else {
                console.log('Permission denied: ', response.locals, request.session.user);
		    }
		}
		resolve(allow);
	};
})();