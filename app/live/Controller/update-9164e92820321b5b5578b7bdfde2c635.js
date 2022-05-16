new class Update {
	async act(args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		
		try {
		    let id = req.query.id;
		    let bean = await agent.see('getBeanFromRequest', args);
		    let dao = await agent.see('getDao');
		    await dao.see('update', [bean, id]);
		    res.send({ok: true, bean: bean});
		}
		catch (e) {
		    res.send({ok: false, error: e.message});
		}
		resolve();
	}
}();