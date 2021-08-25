new (function newButton () {
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
})();