new (function getSymbolFromRequest() {
	this.act = async function (args, resolve, reject) {
		let [req, res] = args;
		
		this.agent.see(req.method + '_getSymbolFromRequest', args).then(resolve).catch(reject);
	};
})();
