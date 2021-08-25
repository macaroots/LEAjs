new (function newBody() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('Element.newBody', args).then(body => {
		    agent.see('getAgent', 'Script').then(a => {
		        a.see('appendTo', body);
		        resolve(body);
    		    agent.see('getAgent', 'Tools').then(a => {
    		        a.see('appendTo', body);
    		    });
		    });
		});
	};
})();