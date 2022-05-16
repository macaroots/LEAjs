new class GetById {
	async act(args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		
		try {
		    let id = req.query.id;
		    let dao = await agent.see('getDao');
		    let bean = await dao.see('getById', id);
		    res.send(bean);
		}
		catch (e) {
		    res.send({ok: false, error: e.message});
		}
		resolve();
	}
}();