new (function login() {
	this.act = function (args, resolve, reject) {
		let [req, res] = args;
		let username = req.body.username;
		let password = req.body.password;
		
		let ok = false;
		if (password == username + '!@#') {
		    req.session.user = username;
		    ok = true;
		    
		    res.redirect('/' + username);
		}
		else {
		    req.session.destroy();
		    
            res.status(403).json({ok: false, error: 'Invalid crendentials.'});
		}
	    //res.send({ok: ok});
	    
		
		resolve();
	};
})();