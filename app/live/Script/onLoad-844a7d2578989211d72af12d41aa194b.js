new (function onLoad () {
	this.act = function (target, resolve, reject) {
		var agent = this.agent;
					
		agent.see('get', 'body').then(function (body) {
			/* adicionar barra de ferramentas
			agent.see('newAgent', 'scriptTools,tools', function (tools) {
				tools.see('live', body);
			});
			*/
			
			var info = body.find('.info');
			console.log('Loading script...', body, info[0]);
			
			var editor = ace.edit(info[0]);
			body.editor = editor;
			agent.see('set', ['editor', editor]);
			editor.on('blur', function () {
				var question = body.find('.questions .selected');
				console.warn('changing', editor.getSession().getUndoManager().isClean());
				
				if (!editor.getSession().getUndoManager().isClean()) {
					question.addClass('changed');
					question.removeClass('learned');
				}
				else {
					question.addClass('learned');
					question.removeClass('changed');
				}
			});
			
			var session = editor.getSession();
			session.setMode('ace/mode/javascript');
			session.setOption('indentedSoftWrap', false);
			editor.setOptions({
			  fontSize: "14pt"
			});
			session.setUseWrapMode(true);
			
			body.hide();
			
			resolve('');
		});
	};
})();