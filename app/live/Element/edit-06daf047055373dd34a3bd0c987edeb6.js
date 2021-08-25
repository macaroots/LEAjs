new (function edit () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('editCss').then(function () {
    		agent.see('ask', 'onLoad').then(function () {
    	        agent.see('editHtml').then(resolve);
    		});
		}).catch(reject);
	};
})();