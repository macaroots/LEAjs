new (function getBeans() {
    let beans = [];
	this.act = function (args, resolve, reject) {
		
		resolve(beans);
	};
})();