new (function live() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('addName', 'Page Element').then(function () {
			agent.see('Element.live', args).then(resolve).catch(reject);
		});
	};
})();