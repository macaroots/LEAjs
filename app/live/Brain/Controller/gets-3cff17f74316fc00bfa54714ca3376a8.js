new (function gets() {
	this.act = async function (args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		let search = await agent.see('getSymbolFromRequest', args);
		let library = await agent.see('getLibrary');
	    let symbols = await library.get(search);
	    
	    res.json(symbols);
	};
})();