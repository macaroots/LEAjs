new (function object() {
	this.act = function (args, resolve, reject) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(args);
        	};
        })();
        resolve(returnFunction);
	};
})();