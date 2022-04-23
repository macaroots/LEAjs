new (function onLoad() {
	this.act = function (args, resolve, reject) {
	    this.agent.see('list', '.list');
		resolve();
	};
})();