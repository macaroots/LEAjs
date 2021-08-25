new (function brainSet() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('getLibrary').then(brain => {
		    brain.set(args).then(resolve).catch(reject);
		});
	};
})();