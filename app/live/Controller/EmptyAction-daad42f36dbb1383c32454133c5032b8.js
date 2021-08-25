new (function EmptyAction() {
	this.act = function (args, resolve, reject) {
		let [req, res] = args;
		// your code here
		resolve();
	};
})();