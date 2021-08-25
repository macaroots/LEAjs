new (function appendTo () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		
		var tag;
		var target;
		if (typeof args == 'string') {
			args = args.split(',');
		}
		target = args[0];
		tag = args[1];
		if (target == null) {
			target = $('.selected');
			if (target.length == 0) {
				target = 'body';
			}
		}
		
		agent.see('getBody', tag).then(function (body) {
			if (body != null) {
				body.detach().appendTo(target);
			}
			
			if (window['getAgent'] == null) {
				window['getAgent'] = function (element) {
					var _agent = $(element).closest('.Naive')[0].agent;
					window['_agent'] = _agent;
					return _agent;
				};
			}
			
			resolve();
		});
	};
})();