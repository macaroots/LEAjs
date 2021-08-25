new (function index() {
	this.act = async function (args, resolve, reject) {
		let [req, res] = args;
		
		let ejs = (await import('ejs')).default;
		
		let agent = this.agent;
		
		let url = '//' + req.headers.host + '/';
		
		
		res.send(ejs.render(await agent.see('indexView'), {
		    req: req,
		    agent: agent, 
		    baseUrl: url, 
		    LICENSE: await agent.see('LICENSE')
		}));
		resolve();
	};
})();