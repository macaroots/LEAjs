new (function editHtml () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
        agent.see('get', 'body').then(function (body) {
		    Ceed('Script').then(script =>
				script.see('askBind', [agent, 'getHtml', body]).then(resolve)
			);
        }).catch(reject);
	};
})();