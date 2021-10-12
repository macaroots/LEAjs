new (function getLinkFromRequest() {
	this.act = async function (args, resolve, reject) {
		let req = args[0];
		let res = args[1];
		let agent = this.agent;
		
		let brain = await import('./brain.js');
		let Link = brain.Link;
		
		let symbols = [];
		for (let role of ['a', 'r', 'b']) {
		    symbols.push(agent.see('getSymbolFromRequest', [req, res, role]));
		}
		await Promise.all(symbols);
		let link = new Link(await symbols[0], await symbols[1], await symbols[2]);
		resolve(link);
	};
})();