new (function insert() {
	this.act = async function (args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		
		try {
		    let bean = await agent.see('getBeanFromRequest', args);
		    let dao = await agent.see('getDao');
		    await dao.see('insert', bean);
		    res.send({ok: true, bean: bean});
		}
		catch (e) {
		    res.send({ok: false, error: e.message});
		}
		resolve();
	};
})();