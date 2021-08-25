new (function PreDispatch() {
	this.act = function (args, resolve, reject) {
		let req = args[0];
		let res = args[1];
		// your code here
		resolve(true);
	};
})();