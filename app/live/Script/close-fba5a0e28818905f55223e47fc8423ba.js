new (function close() {
	this.act = function (args, resolve, reject) {
		this.agent.see('get', 'body', function (body) {
		    var questions = body.find('.questions');
		    var question = questions.find('.selected');
		    question.remove();
		    if (questions.html() == '') {
		        body.hide();
		    }
		    else {
		        questions.find('label:first').click();
		    }
		});
		resolve();
	};
})();