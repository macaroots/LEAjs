new (function live() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
	    agent.see('addName', 'List Element', function () {
		    agent.see('Element.live', args, resolve);
		});
	};
})();