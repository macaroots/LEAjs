new (function seeClick() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
    		var form = body.children('form.ce');
    		var action = form.children('input[name=action]').val();
    		var target = form.children('input[name=target]').val();
    		var selectedAgent = form.find('select option:selected')[0].agent;
			selectedAgent.see(action, target).then(function (answer) {
			    window._ = answer;
			    try {
    				body.find('.answers').append('<div class="' + action + '">' + JSON.stringify(answer) + '</div>');
			    } catch {
    				body.find('.answers').append('<div class="' + action + '">' + answer + '</div>');
			    }
			});
		});
		resolve();
	};
})();