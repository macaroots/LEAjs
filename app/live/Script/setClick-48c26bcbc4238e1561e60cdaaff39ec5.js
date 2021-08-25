new (function setClick() {
	this.act = function (args, resolve, reject) {
		var script = this.agent;
	    script.see('getBody').then(function (body) {
		    script.see('get', 'editor').then(function (editor) {
		        var question = body.find('.selected');
		        var asker = question[0].agent;
		        var key = question.find('input').val();
		        var type = body.find('input[name=type]').val();
				var info = editor.getValue();
		        var answer = new Symbol(0, type, info);
				asker.see('understand', [key, answer]).then(function (learned) {
				    console.log('Learned:', key, learned);
					if (learned) {
						question.addClass('learned');
						question.removeClass('changed');
    					editor.getSession().getUndoManager().markClean();
					}
					resolve(learned);
				});
		        
		    });
		});
	};
})();