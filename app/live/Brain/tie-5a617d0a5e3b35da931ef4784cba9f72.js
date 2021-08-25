new (function tie() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('getLibrary').then(brain => {
		    brain.tie(args).then(resolve);
		});
	};
})();