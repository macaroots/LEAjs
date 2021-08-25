new (function getBody() {
	this.act = async function (tag, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('get', 'body');
	    if (!body) {
	        body = await agent.see('newBody', tag)
	    }
	    resolve(body);
	};
})();