new (function submit () {
	this.act = function (args, resolve, reject) {
		var script = this.agent;
		script.see('get', 'editor').then(function (editor) {
		    script.see('get', 'body').then(function (body) {
		        var question = body.find('.selected');
		        var asker = question[0].agent;
		        var key = question.find('input').val();
		        var type = body.find('input[name=type]').val();
				var info = editor.getValue();
		        var answer = new Symbol(0, type, info);
				asker.see('hear', [key, answer]).then(function (learned) {
				    console.log('Learned:', key, learned);
					if (learned) {
						question.addClass('learned');
						question.removeClass('changed');
    					editor.getSession().getUndoManager().markClean();
					}
				});
		        
		    });
		});
	};
})();