new class Delete {
	async act(args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		
		try {
		    let id = req.query.id;
		    let dao = await agent.see('getDao');
		    let r = await dao.see('delete', id);
		    res.send({ok: true, r: r});
		}
		catch (e) {
		    res.send({ok: false, error: e.message});
		}
		resolve();
	}
}();