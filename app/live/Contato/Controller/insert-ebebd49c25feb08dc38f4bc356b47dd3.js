new (function insert() {
	this.act = async function (args, resolve, reject) {
		let [req, res] = args;
		let agent = this.agent;
		
		try {
		    let bean = await agent.see('getBeanFromRequest', args);
		    let mailer = await agent.see('getAgent', 'Mailer');
		    await mailer.see('send', bean);
		    res.send({ok: true});
		}
		catch (e) {
		    res.status(400);
		    res.send({ok: false, error: e.message});
		}
		resolve();
	};
})();