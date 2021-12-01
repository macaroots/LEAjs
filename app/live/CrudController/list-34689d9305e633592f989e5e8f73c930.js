new (function list() {
	this.act = async function (args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		
	    let dao = await agent.see('getDao');
		let beans = await dao.see('list');
		res.send(beans);
		resolve();
	};
})();