new (function reason() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('getLibrary').then(brain => {
		    brain.reason(args).then(resolve);
		});
	};
})();