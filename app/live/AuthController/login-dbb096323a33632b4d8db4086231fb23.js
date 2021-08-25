new (function login() {
	this.act = function (args, resolve, reject) {
		let [req, res] = args;
		let username = req.body.username;
		let password = req.body.password;
		
		if (password == username + '!@#') {
		    req.session.user = username;
		    res.send({ok: true});
		}
		else {
		    req.session.destroy();
		    res.send({ok: false});
		}
		
		resolve();
	};
})();