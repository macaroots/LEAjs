new (function executeClick() {
	this.act = function (args, resolve, reject) {
		var script = this.agent;
		script.see('setClick').then(function () {
		    script.see('getBody').then(function (body) {
		        var question = body.find('.selected');
	            var asker = question[0].agent;
		        var key = question.find('input').val();
		        asker.see(key);
    		});
		});
		resolve();
	};
})();