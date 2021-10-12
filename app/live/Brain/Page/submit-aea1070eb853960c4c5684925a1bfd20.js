new (function submit () {
	this.act = function (args, callback) {
	    var presenter = this.agent;
	    this.agent.see('get', 'body', function (body) {
    		var response = body.find('.responses');
	        response.html('Reasoning...');
	        let data = $(args).serialize();
	        fetch('/brain/reason?' + data).then(async function (r) {
                presenter.see('renderReason', await r.json());
    		});
	    });
	};
})();