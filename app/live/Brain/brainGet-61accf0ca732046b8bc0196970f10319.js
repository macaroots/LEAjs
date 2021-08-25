
new (function brainGet() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('getLibrary').then(brain => {
		    brain.get(args).then(resolve).catch(reject);
		});
	};
})();