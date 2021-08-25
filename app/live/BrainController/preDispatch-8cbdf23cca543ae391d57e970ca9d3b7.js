new (function PreDispatch() {
	this.act = async function (args, resolve, reject) {
		let [request, response] = args;
		
		const agent = this.agent;
	
		if (await agent.see('allowed', args)) {
			resolve(true);
	    }
		else {
		    let message = "{ok: false, error: 'Permission denied!'}";
			response.send(message);
			reject(message);
		}
		resolve(true);
	};
})();