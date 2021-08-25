new (function live() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('addName', 'CE Element').then(function () {
		    agent.see('study', 'askFor');
    		Ceed().then(ceed => {
    		    ceed.see('addListener', ['newAgent', agent]);
    		})
		    agent.see('Element.live', args).then(resolve);
		}).catch(reject);
	};
})();