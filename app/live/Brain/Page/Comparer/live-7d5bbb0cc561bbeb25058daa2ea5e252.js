new (function live() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('addName', 'Element').then(resolve).catch(reject);
		
	    this.agent.see('appendTo', 'body');
	    
		resolve(true);
	};
})();