new (function collapse () {
	this.act = function (args, resolve, reject) {
	    this.agent.see('getBody').then(function (body) {
    		body.find('.responses input[type=checkbox]').attr('checked', false);
    		resolve();
	    })
	};
})();