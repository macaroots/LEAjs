import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';

Ceed().then(async agent => {
	await Promise.all([
		agent.see('write', ['Script.live', new Symbol(0, 'js', `new (function live () {
	this.act = function (target, resolve, reject) {
console.log('SCRIPT LIVE', this.agent.toString());
		var agent = this.agent;
		agent.see('addName', 'Script Element').then(async function () {
		    let loadAce = new Promise((resolve, reject) => {
    			$.ajax({
    				type: "GET",
    				url: 'https://pagecdn.io/lib/ace/1.4.12/ace.min.js',
    				dataType: "script",
    				cache: true,
    				success: function () { 
    					ace.config.set('modePath', 'https://pagecdn.io/lib/ace/1.4.12/');
    					ace.config.set('workerPath', 'https://pagecdn.io/lib/ace/1.4.12/');
    					ace.config.set('themePath', 'https://pagecdn.io/lib/ace/1.4.12/');
    					
    					resolve(true);
    				}
    			});
		    });
		    await Promise.all([
		        loadAce,
    			agent.see('study', 'html'),
    			agent.see('study', 'reloadHtml'),
    			agent.see('study', 'getHtml'),
    			agent.see('study', 'appendTo'),
    			agent.see('study', 'trigger'),
    			agent.see('study', 'onLoad'),
		        agent.see('study', 'askFor'),
    			agent.see('study', 'askBind')
    		]);
			resolve(true);
		});
	};
})();`)]),
		agent.see('write', ['Script.getHtml', new Symbol(0, 'html', `<form onsubmit="getAgent(this).see('submit', this); return false;">
    <div class="questions"></div>
    <div class="info" style="width: 600px; height: 400px; float: left;"></div>
    <input name="type" placeholder="type" onchange="getAgent(this).see('typeChanged', this);">
    <div class="versions">
        <label for="version">version: </label>
        <input id="version" onchange="getAgent(this).see('changeVersion', 0);" value="0">
        / <label class="total"></label>
        <button accessKey="p" onclick="getAgent(this).see('changeVersion', -1);" type="button">previous</button>
        <button accessKey="n" onclick="getAgent(this).see('changeVersion', 1);" type="button">next</button>
    </div>
    
    <br>
    <button accessKey="" onclick="getAgent(this).see('executeClick');" type="button">execute</button>
    <button accessKey="s" type="submit">Save</button>
    <button accessKey="w" onclick="getAgent(this).see('close');" type="button">close</button>
    <button accessKey="t" onclick="getAgent(this).see('setClick');" type="button">set</button>
    <button accessKey="r" onclick="getAgent(this).see('readClick');" type="button">read</button>
    <button accessKey="d" onclick="getAgent(this).see('download');" type="button">download</button>
</form>`)]),
		agent.see('write', ['Script.onLoad', new Symbol(0, 'js', `new (function onLoad () {
	this.act = function (target, resolve, reject) {
		var agent = this.agent;
					
		agent.see('get', 'body').then(function (body) {
			/* adicionar barra de ferramentas
			agent.see('newAgent', 'scriptTools,tools', function (tools) {
				tools.see('live', body);
			});
			*/
			
			var info = body.find('.info');
			console.warn('script onLoad', body, info[0]);
			
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
})();`)]),
		agent.see('write', ['Script.askFor', new Symbol(0, 'js', `new (function askFor () {
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
})();`)]),
		agent.see('write', ['Script.submit', new Symbol(0, 'js', `new (function submit () {
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
				asker.see('hearAnswer', [key, answer]).then(function (learned) {
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
})();`)]),
		agent.see('write', ['Script.askBind', new Symbol(0, 'js', `new (function askBind () {
	this.act = function (args, resolve, reject) {
	    let agent = this.agent;
	    let target = args[2];
	    agent.see('askFor', args).then(function (question) {
	        let session = question.session;
            session.removeAllListeners('change');
            if (target.html() != '') {
                session.setValue(target.html(), -1);
                session.getUndoManager().markClean();
            }
            session.on('change', function() {
                target.html(session.getValue());
            });
		resolve();
	    });
	};
})();`)]),
		agent.see('write', ['Script.typeChanged', new Symbol(0, 'js', `new (function typeChanged() {
	this.act = function (type, resolve, reject) {
	    var agent = this.agent;
	    agent.see('get', 'editor').then(function (editor) {
            var mode = type.value;
            var session = editor.getSession();
            var question = $('.questions .selected')[0];
            question._type = mode;
            if (mode == 'js') {
                mode = 'javascript';
            }
            session.setMode('ace/mode/' + mode);
	        
	    });
		resolve();
	};
})();`)]),
		agent.see('write', ['Script.executeClick', new Symbol(0, 'js', `new (function executeClick() {
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
})();`)]),
		agent.see('write', ['Script.setClick', new Symbol(0, 'js', `new (function setClick() {
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
})();`)]),
		agent.see('write', ['Script.changeVersion', new Symbol(0, 'js', `new (function changeVersion () {
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
})();`)]),
		agent.see('write', ['Script.close', new Symbol(0, 'js', `new (function close() {
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
})();`)]),
	]);
});
