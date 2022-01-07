new (function show() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('get', 'parent').then(function (parent) {
		    //console.log('show parent', parent, parent != agent, parent && parent != agent);
		    if (parent && parent != agent) {
		        parent.see('show');
		    }
		})
		agent.see('getBody').then(function (body) {
		    body?.show();
		    resolve();
		});
	};
})();