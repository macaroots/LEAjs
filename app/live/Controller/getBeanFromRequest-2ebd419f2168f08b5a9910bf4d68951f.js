new (function getBeanFromRequest() {
	this.act = function (args, resolve, reject) {
		let [req, res] = args;
		
		resolve(req.body);
	};
})();