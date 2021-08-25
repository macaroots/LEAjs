new (function show() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
		    if (!body) {
		        body.show();
		    }
		    resolve();
		});
	};
})();