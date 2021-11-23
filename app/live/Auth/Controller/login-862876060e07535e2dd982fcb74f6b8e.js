new (function login() {
	this.act = function (args, resolve, reject) {
		let [req, res] = args;
		let username = req.body.username;
		let password = req.body.password;
		
		let ok = false;
		if (password == username + '!@#') {
		    req.session.user = username;
		    ok = true;
		}
		else {
		    req.session.destroy();
		}
	    res.send({ok: ok});
		
		resolve();
	};
})();