new class explode {
	act(args, resolve, reject) {
	    this.agent.see('getBody').then(function (body) {
    		body.find('.responses input[type=checkbox]').attr('checked', true);
    		resolve();
	    });
	}
}();