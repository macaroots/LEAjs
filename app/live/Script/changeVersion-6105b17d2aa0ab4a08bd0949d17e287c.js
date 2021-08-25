new (function changeVersion () {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('get', 'body', function (body) {
		    let input = body.find('#version');
		    let version = parseInt(input.val()) + args;
		    input.val(version);
		    let question = body.find('.questions > .selected')[0];
	        let txType = body.find('input[name=type]');
	        let session = question.session;
		    
		    try {
    		    let representation = question.representations[version];
    			let type = representation.type;
    			let info = representation.info;
    
                question._type = type;
    			txType.val(type);
    			session.setValue(info, -1);
    			session.getUndoManager().markClean();
    			txType.trigger('change');
    			
    		    resolve(representation);
		    } catch {}
		});
	};
})();