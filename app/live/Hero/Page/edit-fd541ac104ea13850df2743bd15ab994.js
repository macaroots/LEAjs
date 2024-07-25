new (function edit () {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('ask', 'onLoad').then(function () {
		    agent.see('editCss').then(function () {
    	        agent.see('editHtml').then(function () {                      agent.see('onLoad').then(resolve);
    	        });
    		});
		}).catch(reject);
	};
})();