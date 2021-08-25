new (function askFor() {
	this.act = function (args, resolve, reject) {
		this.agent.see('getAgent', 'Script').then(script => {
		    script.see('askFor', args).then(resolve);
		}).catch(reject);
	};
})();