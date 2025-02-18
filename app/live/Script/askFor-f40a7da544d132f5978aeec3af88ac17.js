new (function askFor () {
	this.act = async function (args, resolve, reject) {
		let script = this.agent;
		let asker;
		let key;
		if (typeof args == 'string') {
    		let list = args.split('.');
    		asker = $('.' + list[0])[0].agent;
    		key = list[1];
		}
		else {
		    asker = args[0];
		    key = args[1];
		}
		
	    let body = await script.see('getBody');
        try {
	        console.log(key);
	        let l = [...body[0].querySelectorAll('.questions label')].filter(q => q._key == key && q.agent == asker)[0].click();
	        return
        } catch (e) {
	        console.log(e);
            
        }
        
		let editor = await script.see('get', 'editor');
	    if (editor == null) {
	        console.warn('Editor missing!');
			// await script.see('appendTo', 'body');
	        return false;
	    }
	    
        script.see('show');
        
	    editor.removeAllListeners('change');
	    
        let txType = body.find('input[name=type]');
		let totalVersions = body.find('.versions > .total');
        let questions = body.find('.questions');
        let question = $('<label>').prependTo(questions);
        let txName = $('<span>').prependTo(question);
        question[0].agent = asker;
        question[0]._key = key;
        let name = asker.see('getNames');
        name.then(function (names) {
            txName.html(names);
        });
        let keyInput = $('<input>').appendTo(question);
        keyInput.val(key);
        
        const session = ace.createEditSession('', editor.getSession().getMode());
        session.setOption('indentedSoftWrap', false);
		session.setUseWrapMode(true);
		session.getUndoManager().markClean();
		
        question[0].session = session;
        let selectQuestion = function (event) {
            editor.setSession(question[0].session); 
            editor.focus();
            questions.find('.selected').removeClass('selected');
            question.addClass('selected');
            txType.val(question[0]._type);
            try {
	            totalVersions.html(question[0].representations.length);
            } catch (e) {}
        };
        question.click(selectQuestion);
        question.trigger('click');
    
	    let type = '';
		let info = '';
		let context = 1;
		
		let representations = await asker.see('read', key);
		if (representations != null && representations.length > 0) {
		    question[0].representations = representations;
		    let representation = representations[representations.length - context];
			type = representation.type;
			info = representation.info;

            question[0]._type = type;
			txType.val(type);
			session.setValue(info, -1);
			session.getUndoManager().markClean();
			
            let mode = type;
            if (mode == 'js') {
                mode = 'javascript';
            }
            session.setMode('ace/mode/' + mode);
		}
		else {
			representations = await asker.see('read', 'EmptyAction');
			if (representations != null && representations.length > 0) {
			    question[0].representations = representations;
			    let representation = representations[representations.length - 1];
				type = representation.type;
				info = representation.info;
				info = info.replace(new RegExp('{agent}', 'g'), await name);
				
				let actionName = key.charAt(0).toUpperCase() + key.slice(1) + 'Action';
				info = info.replace(new RegExp('EmptyAction', 'g'), actionName);
				
                question[0]._type = type;
				txType.val(type);
				session.setValue(info, -1);
				session.getUndoManager().markClean();
				
                let mode = type;
                if (mode == 'js') {
                    mode = 'javascript';
                }
                session.setMode('ace/mode/' + mode);
			}
		}
        resolve(question[0]);
	};
})();