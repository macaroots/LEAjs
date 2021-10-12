new (function reason() {
	this.act = async function (args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		let search = await agent.see('getLinkFromRequest', args);
// console.log('REASON', link);
		let library = await agent.see('getLibrary');
	    let links = await library.reason(search);
	    res.json(links);
	};
})();
