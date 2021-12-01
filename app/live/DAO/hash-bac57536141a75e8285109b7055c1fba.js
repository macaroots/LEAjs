new (function hash() {
	this.act = function (text, resolve, reject) {
		
		resolve(text.toUpperCase);
	};
})();