new (function hide() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
		    body.hide();
		    resolve();
		});
	};
})();