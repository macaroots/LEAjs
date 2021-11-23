new (function onLoad() {
	this.act = function (args, resolve, reject) {
		this.agent.see('novo');
		resolve();
	};
})();