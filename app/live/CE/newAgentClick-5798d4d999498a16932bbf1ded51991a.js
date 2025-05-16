new (function newAgentClick() {
	this.act = async function (args, resolve, reject) {
	    var name = prompt('Who you gonna call?', 'agent1');
	    if (name) {
    	    name += ' Element';
    		let agent = await this.agent.see('getAgent', name);
    		await agent.see('appendTo', 'main');
    		await agent.see('edit');
	    }
		resolve();
	};
})();