new (function ejs() {
	this.act = async function (code, resolve, reject) {
		const ejs = (await import('ejs')).default;
		const action = new (function () {
        	this.act = function (data, innerResolve) {
        		innerResolve(ejs.render(code, data));
        	};
        })();
        resolve(action);
	};
})();