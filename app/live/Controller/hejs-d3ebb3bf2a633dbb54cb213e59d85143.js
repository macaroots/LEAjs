new (function hejs() {
	this.act = async function (code, resolve, reject) {
		const ejs = (await import('ejs')).default;
		const action = new (function () {
        	this.act = function ([req, res], innerResolve) {
        		res.send(ejs.render(code));
        	};
        })();
        resolve(action);
	};
})();