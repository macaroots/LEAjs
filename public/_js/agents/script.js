/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
 
function live () {
	this.act = function (target, callback) {
		const baseUrl = 'https://pagecdn.io/lib/ace/1.4.12/';
		var agent = this.agent;
		agent.see('addName', 'Script', function () {
		    agent.see('addName', 'Element:Script', function () {
				agent.see('study', 'askFor');
		        $.ajax({
                    type: "GET",
                    url: baseUrl + 'ace.js',
                    dataType: "script",
                    cache: true,
                    success: function () { 
            			ace.config.set("modePath", baseUrl);
                        ace.config.set("workerPath", baseUrl);
                        ace.config.set("themePath", baseUrl);
        		        
                        agent.see('Element.live', target, function (body) {
                    		/* adicionar barra de ferramentas
                    		agent.see('newAgent', 'scriptTools,tools', function (tools) {
                    		    tools.see('live', body);
                    		});
                    		*/
                            
                    		var info = body.find('.info');
                    		console.warn('script live', body, info[0]);
                    		
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
                    		
                    		//agent.see('askFor', 'script.run1');
                    		body.hide();
                    		callback(body); // return statement
                		});
                    }
        		});
		    });
		});
	};
};
function addName () {
	this.act = function (args, callback) {
	    var agent = this.agent;
	    var names = agent.mind.names;
	    var name, relativeName, index;
	    if (typeof args == 'string') {
	        if (args.indexOf(':') == -1) {
    	        name = args;
    	        relativeName = agent.mind.getName();
    	        index = 1;
	        }
	        else {
	            args = args.split(':');
    	        name = args[0];
    	        relativeName = args[1];
    	        index = parseInt(args[2] || 1);
	        }
	    } 
	    else {
	        name = args[0];
	        relativeName = args[1];
	        index = args[2] || 1;
	    }
	    
	    let newNames = name.split(' ');
        let indexRelative = names.indexOf(relativeName);
	    let indexFinal = index + indexRelative;
	    for (var i in newNames) {
	        name = newNames[i];
	        var indexNew = names.indexOf(name);
    	    if (indexNew != -1) {
    	        indexFinal = indexNew + 1;
    	        continue;
    	    }
    	    
	        names.splice(indexFinal, 0, name);
	        indexFinal++;
	        
	    }
		callback(names); // return statement
	};
};

function Element_live () {
	this.act = function (args, callback) {
		var agent = this.agent;
		agent.see('addName', 'Element', function () {
		
    	    var tag;
    	    var target;
    		if (typeof args == 'string') {
    		    args = args.split(',');
    		}
			try {				
				target = args[0];
				tag = args[1];
			} catch {}
    		if (target == null) {
    		    target = $('.selected');
    		    if (target.length == 0) {
    		        target = 'body';
    		    }
    		}
    		if (tag == null) {
    		    tag = '<div>';
    		}
            
            var getBody = function (callback) {
                agent.see('get', 'body', callback);
            };
            agent.getBody = getBody;
                
            agent.see('get', 'body', function (body) {
                if (body != null) {
                    body.remove();
                }
        		body = $(tag).appendTo(target);
        		// bind agent-div
        		agent.see('set', ['body', body]);
        		body[0].agent = agent;
        		agent.see('getNames', null, function (names) {
        		    body.addClass(names);
        		});
        		
        		agent.see('reloadHtml', null, function () {
        		    callback(body); // return statement
        		    agent.see('trigger', 'onLoad');
        		});
        		agent.see('reloadCss');
        		/*
        		body.click(function (event) {
        		    agent.see('clicked', event);
        		});*/
        		
        		if (window['getAgent'] == null) {
        		    window['getAgent'] = function (element) {
        		        var _agent = $(element).closest('.Naive')[0].agent;
        		        window['_agent'] = _agent;
        		        return _agent;
        		    };
        		}
        		
            });
		});
	};
};
function reloadHtml () {
	this.act = function (args, callback) {
	    var agent = this.agent;
        agent.see('get', 'body', function (body) {
    		agent.see('getHtml', null, function (html) {
    		    body.append(html);
    		    callback(body); // return statement
    		});
        });
	};
}
function reloadCss () {
	this.act = function (args, callback) {
		var agent = this.agent;
        agent.see('getStyle', null, function (style) {
		    
		    agent.see('getCss', null, function (css) {
		        style.html(css);
		        
		        callback(true); // return statement
		    });
		});
	};
}
function getStyle () {
	this.act = function (args, callback) {
	    var agent = this.agent;
	    agent.see('get', 'style', function (style) {
	        if (style == null) {
        		style = $('<style>').appendTo('head');
        		agent.see('set', ['style', style], function () {
        		    callback(style);
        		});
	        }
	        else {
	            callback(style);
	        }
	    });
	};
}

let x = `<form onsubmit="getAgent(this).see('submit', this); return false;">
    <div class="questions"></div>
    <div class="info" style="width: 600px; height: 400px; float: left;"></div>
    <input name="type" placeholder="type" onchange="getAgent(this).see('typeChanged', this);">
    <div class="versions">
        <label for="version">version: </label>
        <input id="version" onchange="getAgent(this).see('changeVersion', 0);" value="0">
        / <label class="total"></label>
        <button onclick="getAgent(this).see('changeVersion', -1);" type="button">previous</button>
        <button onclick="getAgent(this).see('changeVersion', 1);" type="button">next</button>
    </div>
    
    <br>
    <button accessKey="" onclick="getAgent(this).see('executeClick');" type="button">execute</button>
    <button accessKey="s" type="submit">Save</button>
    <button accessKey="w" onclick="getAgent(this).see('close');" type="button">close</button>
    <button accessKey="t" onclick="getAgent(this).see('setClick');" type="button">set</button>
    <button accessKey="r" onclick="getAgent(this).see('readClick');" type="button">read</button>
    <button accessKey="d" onclick="getAgent(this).see('download');" type="button">download</button>
</form>`;
function css () {
	this.act = function (target, callback) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(target);
        	};
        })();
        callback(returnFunction);
	};
}
function trigger () {
	this.act = function (eventName, callback) {
		var agent = this.agent;
	    agent.see(eventName, null, function (script) {
	        $('body').append(script);
	        
	        callback(true); // return statement
	    });
		//callback(args); // return statement
	};
}
function askFor () {
	this.act = function (args, callback) {
		var script = this.agent;
		var asker;
		var key;
		if (typeof args == 'string') {
    		var list = args.split('.');
    		asker = $('.' + list[0])[0].agent;
    		key = list[1];
		}
		else {
		    asker = args[0];
		    key = args[1];
		}
		script.see('get', 'parent', function (parent) {
		    parent.see('show');
		});
		script.see('get', 'editor', function (editor) {
		    if (editor == null) {
		        console.warn('Editor missing!');
				// TODO gambiarra potencialmente perigosa!!
				setTimeout(() => {  
					script.see('askFor', args, callback);
				}, 1000);
		        return false;
		    }
		    editor.removeAllListeners('change');
		    script.see('get', 'body', function (body) {
		        body.show();
		        var txType = body.find('input[name=type]');
    			var totalVersions = body.find('.versions > .total');
		        var questions = body.find('.questions');
		        var question = $('<label>').prependTo(questions);
		        var name = $('<span>').prependTo(question);
		        question[0].agent = asker;
		        question[0]._key = key;
		        asker.see('getNames', null, function (names) {
		            name.html(names);
		        });
		        var keyInput = $('<input>').appendTo(question);
		        keyInput.val(key);
		        
                var session = ace.createEditSession('', editor.getSession().getMode());
                session.setOption('indentedSoftWrap', false);
        		session.setUseWrapMode(true);
    			session.getUndoManager().markClean();
        		
		        question[0].session = session;
		        var selectQuestion = function (event) {
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
		    
    		    var type = '';
    			var info = '';
    			var representations;
    			var context = 1;
    			
    			asker.see('read', key, function (representations) {
    				if (representations != null && representations.length > 0) {
					    question[0].representations = representations;
    				    var representation = representations[representations.length - context];
    					type = representation.type;
    					info = representation.info;
    
                        question[0]._type = type;
    					txType.val(type);
    					session.setValue(info, -1);
    					session.getUndoManager().markClean();
    					txType.trigger('change');
    					
    					callback();
    				}
    				else {
    					asker.see('read', 'EmptyAction', function (representations) {
    						if (representations != null && representations.length > 0) {
    						    question[0].representations = representations;
    						    var representation = representations[representations.length - 1];
    							type = representation.type;
    							info = representation.info;
								asker.see('getName', 0, (name) => {
									info = info.replace(new RegExp('agent', 'g'), name);
								});
    							info = info.replace(new RegExp('EmptyAction', 'g'), key);
                                question[0]._type = type;
    							txType.val(type);
    							session.setValue(info, -1);
    							session.getUndoManager().markClean();
    							txType.trigger('change');
    							
    							callback();
    						}
    					});
    				}
    			});
		    });
		});
		
		callback();
	};
}
function show () {
	this.act = function (args, callback) {
		var agent = this.agent;
		agent.see('get', 'body', function (body) {
			if (body) {
				body.show();
			}
		    callback(true); // return statement
		});
	};
}
function submit () {
	this.act = function (args, callback) {
		var script = this.agent;
		script.see('get', 'editor', function (editor) {
		    script.see('get', 'body', function (body) {
		        var question = body.find('.selected');
		        var asker = question[0].agent;
		        var key = question.find('input').val();
		        var type = body.find('input[name=type]').val();
				var info = editor.getValue();
		        var answer = new Symbol(0, type, info);
				asker.see('hearAnswer', [key, answer], function (learned) {
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
}

// comportamento para os outros agentes
export function AskScript() {
	this.act = async function (key, callback) {
		var agent = this.agent;
		(await Ceed('Script')).see('askFor', [agent, key], callback);
	}
}

import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';
Ceed('Script').then(function (script) {
	/**/
	script.see('set', ['live', new live()]);
	script.see('set', ['addName', new addName()]);
	script.see('set', ['Element.live', new Element_live()]);
	script.see('set', ['reloadHtml', new reloadHtml()]);
	script.see('set', ['reloadCss', new reloadCss()]);
	script.see('set', ['getStyle', new getStyle()]);
	script.see('set', ['css', new css()]);
	script.see('set', ['html', new css()]);
	script.see('understand', ['getCss', new Symbol(0, 'css', `.questions {
		display: flex;
		overflow: auto;
	}

	.questions label {
		border-width: 1px;
		border-style: solid;
		padding: 8px;
		margin: 2px;
		background: white;
	}
	.Script input[name=type], #version {
		width: 105px;
	}

	.selected {
		border-style: solid;
		border-color: blue;
		border-width: 2px !important;
	}

	.learned {
		border-color: green !important;
	}

	.changed {
		border-color: red !important;
	}
	`)]);
	script.see('understand', ['getHtml', new Symbol(0, 'html', x)]);
	script.see('understand', ['onLoad', new Symbol(0, 'html', '')]);
	script.see('set', ['trigger', new trigger()]);
	script.see('set', ['askFor', new askFor()]);
	script.see('set', ['show', new show()]);
	script.see('set', ['submit', new submit()]);
	/*/	
	script.see('write', ['Script.live', new Symbol(0, 'js', 'new (' + live.toString() + ')();')]);
	script.see('write', ['Script.addName', new Symbol(0, 'js', 'new (' + addName.toString() + ')();')]);
	script.see('write', ['Element.live', new Symbol(0, 'js', 'new (' + Element_live.toString() + ')();')]);
	script.see('write', ['Script.reloadHtml', new Symbol(0, 'js', 'new (' + reloadHtml.toString() + ')();')]);
	script.see('write', ['Script.reloadCss', new Symbol(0, 'js', 'new (' + reloadCss.toString() + ')();')]);
	script.see('write', ['Script.css', new Symbol(0, 'js', 'new (' + css.toString() + ')();')]);
	script.see('write', ['Script.html', new Symbol(0, 'js', 'new (' + css.toString() + ')();')]);
	script.see('write', ['Script.getCss', new Symbol(0, 'css', `.questions {
		display: flex;
		overflow: auto;
	}

	.questions label {
		border-width: 1px;
		border-style: solid;
		padding: 8px;
		margin: 2px;
		background: white;
	}
	.Script input[name=type], #version {
		width: 105px;
	}

	.selected {
		border-style: solid;
		border-color: blue;
		border-width: 2px !important;
	}

	.learned {
		border-color: green !important;
	}

	.changed {
		border-color: red !important;
	}
	`)]);
	script.see('write', ['Script.getHtml', new Symbol(0, 'html', x)]);
	script.see('write', ['Script.onLoad', new Symbol(0, 'html', '')]);
	script.see('write', ['Script.trigger', new Symbol(0, 'js', 'new (' + trigger.toString() + ')();')]);
	script.see('write', ['Script.askFor', new Symbol(0, 'js', 'new (' + askFor.toString() + ')();')]);
	script.see('write', ['Script.show', new Symbol(0, 'js', 'new (' + show.toString() + ')();')]);
	script.see('write', ['Script.submit', new Symbol(0, 'js', 'new (' + submit.toString() + ')();')]);
	/**/
	
	//Ceed().then(c => {c.see('getLibraries').then(b=>{console.log('SCRIPT', b[0].toString());})});
	/*let ceed = await Ceed();
	Ceed().then(c => {console.log('SCRIPT', c);});*/
	//console.log('SCRIPT', script.mind.getBrain().toString());
	
});