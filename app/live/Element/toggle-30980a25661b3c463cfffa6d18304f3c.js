new (function toggle() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
		    body.toggle();
		    resolve();
		});
	};
})();