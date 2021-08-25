new (function logout() {
	this.act = function (args, resolve, reject) {
		let [req, res] = args;
		req.session.destroy();
		res.send({ok: true, msg: 'Logged out'});
		resolve();
	};
})();