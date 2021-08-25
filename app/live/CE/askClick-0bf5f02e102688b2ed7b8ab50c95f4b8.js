new (function askClick() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
    		var form = body.children('form.ce');
    		var action = form.children('input[name=action]').val();
    		var selectedAgent = form.find('select option:selected')[0].agent;
			selectedAgent.see('ask', action);
		});
		resolve();
	};
})();