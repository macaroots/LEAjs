new (function user() {
	this.act = function (args, resolve, reject) {
		let [req, res] = args;
		res.send({user: req.session.user});
		resolve();
	};
})();