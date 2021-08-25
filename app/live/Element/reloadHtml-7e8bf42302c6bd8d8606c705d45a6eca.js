new (function reloadHtml () {
	this.act = function (args, resolve, reject) {
	    var agent = this.agent;
        agent.see('get', 'body').then(function (body) {
    		agent.see('getHtml').then(function (html) {
    		    body.append(html);
    		    resolve(body);
    		});
        });
	};
})();