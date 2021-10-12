new (function index() {
	this.act = async function (args, resolve, reject) {
		let req = args[0];
		let res = args[1];
		
		let ejs = (await import('ejs')).default;
		
		let agent = this.agent;
		
		let url = '//' + req.headers.host + '/';
		
		const CLIENT_ID = await agent.see('CLIENT_ID');
		
		res.send(ejs.render(await agent.see('indexView'), {agent: agent, baseUrl: url, CLIENT_ID: CLIENT_ID}));
		resolve();
	};
})();