new (function tie() {
	this.act = async function (args, resolve, reject) {
		let [ req, res ] = args;
		let agent = this.agent;
		let link = await agent.see('getLinkFromRequest', args);
console.log(agent + ' - TIE', link);
		let library = await agent.see('getLibrary');
	    let l = await library.tie(link);
	    res.json(l);
		resolve();
	    
	};
})();