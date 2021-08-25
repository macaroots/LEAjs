new (function CLIENT_ID() {
	this.act = function (args, resolve, reject) {
		resolve(process.env.CLIENT_ID);
	};
})();