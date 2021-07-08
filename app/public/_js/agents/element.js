import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';

Ceed().then(async agent => {
	await Promise.all([
		agent.see('write', ['Element.live', new Symbol(0, 'js', `new (function live() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('addName', 'Element').then(resolve).catch(reject);
	};
})();`)]),
		agent.see('write', ['Element.appendTo', new Symbol(0, 'js', `new (function appendTo () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		
		var tag;
		var target;
		if (typeof args == 'string') {
			args = args.split(',');
		}
		target = args[0];
		tag = args[1];
		if (target == null) {
			target = $('.selected');
			if (target.length == 0) {
				target = 'body';
			}
		}
		
		agent.see('getBody', tag).then(function (body) {
			if (body != null) {
				body.detach().appendTo(target);
			}
			
			if (window['getAgent'] == null) {
				window['getAgent'] = function (element) {
					var _agent = $(element).closest('.Naive')[0].agent;
					window['_agent'] = _agent;
					return _agent;
				};
			}
			
			resolve();
		});
	};
})();`)]),
		agent.see('write', ['Element.reloadCss', new Symbol(0, 'js', `new (function reloadCss () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
        agent.see('getStyle').then(function (style) {
            if (style != null) {
    		    agent.see('getCss').then(function (css) {
    		        style.html(css);
    		        
    		        resolve(true);
    		    });
            }
		});
	};
})();`)]),
		agent.see('write', ['Element.reloadHtml', new Symbol(0, 'js', `new (function reloadHtml () {
	this.act = function (args, resolve, reject) {
	    var agent = this.agent;
        agent.see('get', 'body').then(function (body) {
    		agent.see('getHtml').then(function (html) {
    		    body.append(html);
    		    resolve(body);
    		});
        });
	};
})();`)]),
		agent.see('write', ['Element.getStyle', new Symbol(0, 'js', `new (function getStyle () {
	this.act = function (args, resolve, reject) {
	    var agent = this.agent;
	    agent.see('get', 'style').then(function (style) {
	        if (style == null) {
        		style = $('<style>').appendTo('head');
        		agent.see('set', ['style', style]).then(function () {
        		    resolve(style);
        		});
	        }
	        else {
	            resolve(style);
	        }
	    });
	};
})();`)]),
		agent.see('write', ['Element.getCss', new Symbol(0, 'css', ``)]),
		agent.see('write', ['Element.getHtml', new Symbol(0, 'html', `New Element`)]),
		agent.see('write', ['Element.trigger', new Symbol(0, 'js', `new (function trigger () {
	this.act = function (eventName, resolve, reject) {
		var agent = this.agent;
	    agent.see(eventName).then(function (script) {
	        $('body').append(script);
	        
	        resolve(true);
	    });
	};
})();`)]),
		agent.see('write', ['Element.onLoad', new Symbol(0, 'html', `<script>
// your code here
</script>`)]),
		agent.see('write', ['Element.edit', new Symbol(0, 'js', `new (function edit () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('editCss').then(function () {
    		agent.see('ask', 'onLoad').then(function () {
    	        agent.see('editHtml').then(resolve);
    		});
		}).catch(reject);
	};
})();`)]),
		agent.see('write', ['Element.editCss', new Symbol(0, 'js', `new (function editCss () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
        agent.see('getStyle').then(function (style) {
		    Ceed('Script').then(script => 
				script.see('askBind', [agent, 'getCss', style]).then(resolve)
			);
        }).catch(reject);
	};
})();`)]),
		agent.see('write', ['Element.editHtml', new Symbol(0, 'js', `new (function editHtml () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
        agent.see('get', 'body').then(function (body) {
		    Ceed('Script').then(script =>
				script.see('askBind', [agent, 'getHtml', body]).then(resolve)
			);
        }).catch(reject);
	};
})();`)]),
		agent.see('write', ['Element.getBody', new Symbol(0, 'js', `new (function getBody() {
	this.act = async function (tag, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('get', 'body');
	    if (!body) {
	        body = await agent.see('newBody', tag)
	    }
	    resolve(body);
	};
})();`)]),
		agent.see('write', ['Element.show', new Symbol(0, 'js', `new (function show() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
		    if (!body) {
		        body.show();
		    }
		    resolve();
		});
	};
})();`)]),
		agent.see('write', ['Element.newBody', new Symbol(0, 'js', `new (function newBody() {
	this.act = function (tag, resolve, reject) {
	    let agent = this.agent;
		if (!tag) {
			tag = '<div>';
		}
		let body = $(tag);
		// bind agent-div
		agent.see('set', ['body', body]);
		body[0].agent = agent;
		agent.see('getNames').then(function (names) {
			body.addClass(names);
		});
		
		agent.see('reloadHtml').then(function () {
			resolve(body);
			agent.see('trigger', 'onLoad');
		});
		agent.see('reloadCss');
	};
})();`)]),
		agent.see('write', ['Element.toggle', new Symbol(0, 'js', `new (function toggle() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
		    body.toggle();
		    resolve();
		});
	};
})();`)]),
	]);
});
