import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';
import {} from  './element.js';

Ceed().then(async agent => {
	await Promise.all([
		agent.see('write', ['CE.live', new Symbol(0, 'js', `new (function live() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('addName', 'CE Element').then(function () {
		    agent.see('study', 'askFor');
    		Ceed().then(ceed => {
    		    ceed.see('addListener', ['newAgent', agent]);
    		})
		    agent.see('Element.live', args).then(resolve);
		}).catch(reject);
	};
})();`)]),
		agent.see('write', ['CE.getCss', new Symbol(0, 'css', `#auth {
    position: fixed;
    top: 0px;
    right: 8px;
}
body > * {
    width: 52%;
}
[accesskey]::after {
    content: " [" attr(accesskey) "]";
}
.CE {
    border: 1px solid;
    position: fixed;
    width: 47%;
    top: 20px;
    right: 0px;
    bottom: 4px;
    display: flex;
    flex-direction: column;
}
.CE > form {
    text-align: right;
}
.CE > * {
    order: 2;
}
.Tools {
    order: 1;
    margin: 8px;
}
.answers {
    display: none;
}

.questions {
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
`)]),
		agent.see('write', ['CE.getHtml', new Symbol(0, 'html', `<div class="answers"></div>
<form class="ce" onsubmit="getAgent(this).see('seeClick'); return false;">
    <select name="agent"></select>
    <input name="action" placeholder="action" type="list" id="actions" />
    <datalist id="actions"></datalist>
    <input name="target" placeholder="args" />
    <button accessKey="x">run</button>
    <button type="button" accessKey="a" onClick="getAgent(this).see('askClick');">view code</button>
    <button type="button" accessKey="'" onClick="getAgent(this).see('toggle');">hide</button>
</form>`)]),
		agent.see('write', ['CE.askFor', new Symbol(0, 'js', `new (function askFor() {
	this.act = function (args, resolve, reject) {
		this.agent.see('getAgent', 'Script').then(script => {
		    script.see('askFor', args).then(resolve);
		}).catch(reject);
	};
})();`)]),
		agent.see('write', ['CE.onNewAgent', new Symbol(0, 'js', `new (function onNewAgent() {
	this.act = function (args, resolve, reject) {
		var ce = this.agent;
		ce.see('getBody').then(async function (body) {
		    if (!body)
		        return;
			var select = body.find('select');
			select.empty();
			var agents = (await Ceed()).agents;
			var names = [];
			
			for (var i in agents) {
			    try {
    			    let agent = await agents[i][0];
    			    agent.see('getNames').then(name => {
    			        if (!names.includes(name)) {
    			            names.push(name);
            			    let option = $('<option>');
            				option[0].agent = agent;
        					option.text(name);
            				select.prepend(option);
    			        }
    				});
			    } catch {}
			}
			
		});
		resolve();
	};
})();`)]),
		agent.see('write', ['CE.seeClick', new Symbol(0, 'js', `new (function seeClick() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
    		var form = body.children('form.ce');
    		var action = form.children('input[name=action]').val();
    		var target = form.children('input[name=target]').val();
    		var selectedAgent = form.find('select option:selected')[0].agent;
			selectedAgent.see(action, target).then(function (answer) {
				body.find('.answers').append('<div class="' + action + '">' + answer + '</div>');
			});
		});
		resolve();
	};
})();`)]),
		agent.see('write', ['CE.askClick', new Symbol(0, 'js', `new (function askClick() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
    		var form = body.children('form.ce');
    		var action = form.children('input[name=action]').val();
    		var selectedAgent = form.find('select option:selected')[0].agent;
			selectedAgent.see('ask', action);
		});
		resolve();
	};
})();`)]),
		agent.see('write', ['CE.newBody', new Symbol(0, 'js', `new (function newBody() {
	this.act = function (args, resolve, reject) {
		let agent = this.agent;
		agent.see('Element.newBody', args).then(body => {
		    agent.see('getAgent', 'Script').then(a => {
		        a.see('appendTo', body);
		        resolve(body);
    		    agent.see('getAgent', 'Tools').then(a => {
    		        a.see('appendTo', body);
    		    });
		    });
		});
	};
})();`)]),
	]);
});
