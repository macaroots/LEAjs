new (function CheckPermission() {
	this.act = function (args, resolve, reject) {
	    let [agentName, action, target, socket] = args;
		let prohibited = [];//['hear', 'write', 'tie', 'set', 'understand'];
		let allow = false;
		
		if (!prohibited.includes(action)) {
		    allow = true;
		}
		else {
		    if (socket.request.session.user) {
		        allow = true;
		    }
		}
		resolve(allow);
	};
})();