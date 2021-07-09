import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';
import {} from  './element.js';

Ceed().then(async agent => {
	await Promise.all([
		agent.see('write', ['Tools.live', new Symbol(0, 'js', `new (function live () {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
console.log('Tools.live', agent.toString());
		await agent.see('addName', 'Tools Element');
		let response = await agent.see('Element.live', args);
		await agent.see('study', 'newButton');
	    
		resolve(response);
	};
})();`)]),
		agent.see('write', ['Tools.getHtml', new Symbol(0, 'html', `<button onclick="getAgent(this).see('add');">+</button>`)]),
		agent.see('write', ['Tools.newBody', new Symbol(0, 'js', `new (function newBody() {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
		let body = await agent.see('Element.newBody', args);
		resolve(body);
		    
    	let buttonsText = await agent.see('getButtons');
    	if (buttonsText) {
    	    let buttons = JSON.parse(buttonsText);
    	    for (let text in buttons) {
    	        agent.see('newButton', [text, buttons[text]]);
    	    }
    	}
	};
})();`)]),
		agent.see('write', ['Tools.getButtons', new Symbol(0, 'string', `{"page":"addPage","div":"addDiv","form":"addForm","input":"addInput","submit":"addSubmit","agent":"newAgentClick","suggestions":"suggestionClick"}`)]),
		agent.see('write', ['Tools.newButton', new Symbol(0, 'js', `new (function newButton () {
	this.act = function (args, resolve, reject) {
	    var text = args[0];
	    var functionName = args[1];
		var agent = this.agent;
	    
	    if (true == args[2]) {
	        agent.see('getButtons').then(function (buttons) {
	            buttons = JSON.parse(buttons);
	            buttons[text] = functionName;
	            agent.see('write', ['getButtons', JSON.stringify(buttons)]);
	        });
	    }
	    
		agent.see('getBody').then(function (body) {
		    agent.see('get', 'parent').then(function (parent) {
    		    var bt = $('<button>').appendTo(body);
    		    bt.text(text);
    		    bt.click(function (event) {
    		        event.preventDefault();
    		        if (!event.ctrlKey) {
    		            parent.see(functionName);
    		        }
    		        else {
    		            parent.see('ask', functionName);
    		        }
    		    });
		    });
		});
		
		resolve(true);
	};
})();`)]),
		agent.see('write', ['Tools.add', new Symbol(0, 'js', `new (function add () {
	this.act = function (args, callback) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
		    var form = $('<form>').appendTo(body);
		    var text = $('<input name="text" placeholder="Button text" />').appendTo(form);
		    var functionName = $('<input name="function" placeholder="Function name" />').appendTo(form);
		    var btOk = $('<input type="submit" />').appendTo(form);
		    var btCancel = $('<input type="reset" />').appendTo(form);
		    form.submit(function () {
		        agent.see('newButton', [text.val(), functionName.val(), true]);
		        form.remove();
		        return false;
		    });
		    btCancel.click(function () {
		        form.remove();
		    });
		});
		callback(true); // return statement
	};
})();`)]),
	]);
});
