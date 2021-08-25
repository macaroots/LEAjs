new (function askFor () {
	this.act = function (args, resolve, reject) {
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
	    script.see('getBody').then(function (body) {
    		script.see('get', 'editor').then(async function (editor) {
    		    if (editor == null) {
    		        console.warn('Editor missing!');
    				// await script.see('appendTo', 'body');
    		        return false;
    		    }
    		    
    	        script.see('get', 'parent').then(function (parent) {
        		    parent.see('show');
        		});
                body.show();
                
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
    			let representations;
    			let context = 1;
    			
    			asker.see('read', key).then(function (representations) {
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
	                	resolve(false);
    				}
    				else {
    					asker.see('read', 'EmptyAction').then(async function (representations) {
    						if (representations != null && representations.length > 0) {
    						    question[0].representations = representations;
    						    let representation = representations[representations.length - 1];
    							type = representation.type;
    							info = representation.info;
    							info = info.replace(new RegExp('agent', 'g'), await name);
    							info = info.replace(new RegExp('EmptyAction', 'g'), key);
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
		                    resolve(false);
    					});
    				}
    			});
                resolve(question[0]);
		    });
		});
	};
})();