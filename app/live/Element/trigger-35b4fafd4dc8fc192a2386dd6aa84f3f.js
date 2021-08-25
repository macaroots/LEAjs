new (function trigger () {
	this.act = function (eventName, resolve, reject) {
		var agent = this.agent;
	    agent.see(eventName).then(function (script) {
	        $('body').append(script);
	        
	        resolve(true);
	    });
	};
})();