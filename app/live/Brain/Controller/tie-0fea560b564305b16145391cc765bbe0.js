new (function tie() {
	this.act = async function (args, resolve, reject) {
		try {
    		let [req, res] = args;
    		let agent = this.agent;
    		let link = await agent.see('getLinkFromRequest', args);
console.log(agent + ' - TIE', link);
    		let library = await agent.see('getLibrary');
		    let user = req.session.user;
		    if (!await agent.see('allowed', [link, user])) {
		        res.status(403).json({ok: false, error: 'Permission denied!'});
		    }
		    else {
        	    let l = await library.tie(link);
        	    res.json(l);
		    }
		} catch (e) {
		    res.status(500).json({ok: false, error: e});
		}
		resolve();
	    
	};
})();