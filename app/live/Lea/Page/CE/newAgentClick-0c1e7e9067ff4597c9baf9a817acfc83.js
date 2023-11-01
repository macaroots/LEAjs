new (function newAgentClick() {
	this.act = function (args, resolve, reject) {
	    var name = prompt('Who you gonna call?', 'agent1');
	    if (name) {
    	    name += ' Element';
    		this.agent.see('getAgent', name).then(function (agent) {
        		agent.see('appendTo', $('<section>').insertAfter('.Page > main > section:last-of-type'));
        		agent.see('edit');
    		});
	    }
		resolve();
	};
})();